<script lang="ts">
	import { getCopyrightSymbol } from "$helpers";
    import { ItemPage, TrackList } from "$components";
	import type { PageData } from "./$types";

    export let data: PageData;

    $: album = data.album;
    $: color = data.color;
</script>

<ItemPage title={album.name} type={album.type} color={color} image={album.images.length > 0 ? album.images[0].url : undefined}>
    <div class="meta text-[13px] font-semibold " slot="meta">
        <span class="artists">{album.artists.map((artist) => artist.name).join(', ')}</span>
        <span class="date">{new Date(album.release_date).getFullYear()}</span>
        <span class="tracks-count font-normal mt-0 mx-0 mb-[5px] text-light-gray">{`${album.total_tracks} Track${album.total_tracks > 1 ? 's': ''}`}</span>
    </div>
    
    <TrackList tracks={album.tracks.items} />
    <div class="credits mt-[40px]">
        <p class="date">
            {new Date(album.release_date).toLocaleDateString('en', {
                dateStyle: 'medium'
            })}
        </p>
        {#each album.copyrights as copyright}
            <p class="copyright">
                {getCopyrightSymbol(copyright.type)}{copyright.text}
            </p>
        {/each}
    </div>
</ItemPage>

<style>
    p {
        @apply text-light-gray m-0 text-[11px];
        &.date {
            @apply text-[13px];
        }
    }
    .meta {
        &span {
            @apply mr-[5px];
        }
    }
</style>