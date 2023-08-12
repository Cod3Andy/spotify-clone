<script lang="ts">
	import { page } from "$app/stores";
	import { Button, ItemPage, TrackList } from "$components";
    import type { PageData } from "./$types";

    export let data:PageData;

    let isLoading = false;

    $: color = data.color;
    $: playlist = data.playlist;
    $: tracks = data.playlist.tracks;
    $: currentPage = $page.url.searchParams.get('page') || 1;

    let filteredTracks: SpotifyApi.TrackObjectFull[];

    $: {
        filteredTracks = [];
        tracks.items.forEach((item) => {
            if(item.track) filteredTracks = [... filteredTracks, item.track];
        });
    }

    const followersFormat = Intl.NumberFormat('en', {notation: "compact"});
    const loadMoreTracks = async () => {
        if(!tracks.next) return
        isLoading = true;
        const res = await fetch(tracks.next.replace('https://api.spotify.com/v1/', '/api/spotify/'));
        const resJSON = await res.json();
        if(res.ok) {
            tracks = {...resJSON, items: [...tracks.items, ...resJSON.items]};
        } else {
            alert(resJSON.error.message || 'Could not load data!');
        }
        isLoading = false;
    };
</script>

<ItemPage 
    title={playlist.name} 
    image={playlist.images.length > 0 ? playlist.images[0].url : undefined}
    {color}
    type={playlist.type}
>
    <div slot="meta">
        <p class="playlist-description text-light-gray text-[18px] mb-0">{@html playlist.description}</p>
        <p class="meta text-[13px]">
            <span class="font-semibold">{playlist.owner.display_name}</span>
            <span>{followersFormat.format(playlist.followers.total)}</span>
            <span>{playlist.tracks.total} Tracks</span>
        </p>
    </div>

    {#if playlist.tracks.items.length > 0}
        <TrackList tracks={filteredTracks} />
        {#if tracks.next}
            <div class="load-more text-center p-[15px]">
                <Button element="button" variant="outline" disabled={isLoading}
                on:click={loadMoreTracks}
                >Load More <span class="visually-hidden">Tracks</span></Button>
            </div>
        {/if}
            <div class="pagination">
                <div class="previous">
                    {#if tracks.previous}
                        <Button element="a" variant="outline" href="{$page.url.pathname}?{new URLSearchParams({
                            page: `${Number(currentPage) - 1}`
                        }).toString()}">↞ Previous page</Button>
                    {/if}
                </div>
                <div class="next">
                    {#if tracks.next}
                        <Button element="a" variant="outline" href="{$page.url.pathname}?{new URLSearchParams({
                            page: `${Number(currentPage) + 1}`
                        }).toString()}">Next page ↠</Button>
                    {/if}
                </div>
            </div>
        
        {:else}
        <div class="empty-playlist text-center mt-[40px]">
            <p class="text-[22px] font-semibold">No items added to this playlist yet.</p>
            <Button element="a" href="/search">Search for Content</Button>
            <Button element="a" href="/playlists">View all Playlists</Button>
        </div>
    {/if}
</ItemPage>