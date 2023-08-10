<script lang="ts">
    import { Music } from "lucide-svelte";

    type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
    type PlaylistType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
    type ArtistType = SpotifyApi.ArtistObjectFull;

    export let item: AlbumType | PlaylistType | ArtistType;
</script>

<div class="card {item.type}">
    {#if item.images.length > 0}
        <img class="w-full aspect-square object-cover mt-0 mx-0 mb-5" loading="lazy" src={item.images[0].url} alt="{item.type} cover for {item.name}" />
    {:else}
        <div class="cover-placeholder">
            <Music aria-hidden="true" focusable="false" class="w-[40%] h-[40%] text-light-gray" />
        </div>
    {/if}
    <h4 class="mt-0 mx-0 mb-[10px] text-[16px] font-semibold leading-none truncate"><a href="/{item.type}/{item.id}" title={item.name} class="no-underline text-text-color after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 focus-visible:outline-none after:focus:outline after:focus:outline-accent-color after:rounded-[4px]">{item.name}</a></h4>
    {#if item.type === 'album'}
        <p>{item.artists.map(item => item.name).join(', ')}</p>
    {/if}
    {#if item.type === 'playlist'}
        <p>{item.description}</p>
    {/if}
</div>

<style>
    .card {
        transition: backgroud 0.3s;
        @apply relative bg-dark-gray p-[10px] shadow-[0_0_40px_rgba(0,0,0,0.4)] rounded-[4px];
        &:hover {
            @apply bg-medium-gray;
            &:hover .cover-placeholder {
                @apply bg-dark-gray;
            }
        }
    }
    p {
        @apply relative m-0 text-light-gray text-[14px] line-clamp-2;
    }
    .cover-placeholder {
        transition: backgroud 0.3s;
        @apply flex items-center justify-center bg-medium-gray w-full aspect-square mt-0 mx-0 mb-5;
    }
    /* :global(svg) {
        @apply w-[40%] h-[40%];
    } HUH???? Why the guy's global icons on the side panel not increasing in size? Further investigation is needed... */ 
</style>