<script lang="ts">
	import { page } from "$app/stores";
	import { Button, ItemPage, PlaylistForm, TrackList } from "$components";
	import { Heart } from "lucide-svelte";
    import type { ActionData, PageData } from "./$types";
	import { applyAction, enhance } from "$app/forms";
	import { toasts } from "$stores";
	import Modal from "$components/Modal.svelte";
    import type { ActionData as EditActionData } from "./edit/$types";
	import MicroModal from "micromodal";
	import { invalidate } from "$app/navigation";

    export let data:PageData;
    export let form: ActionData | EditActionData;

    let isLoading = false;
    let isLoadingFollow = false;
    let followButton: Button<'button'>;

    $: color = data.color;
    $: playlist = data.playlist;
    $: tracks = data.playlist.tracks;
    $: isFollowing = data.isFollowing;
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
            toasts.error(resJSON.error.message || 'Could not load data!');

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
            <span>{followersFormat.format(playlist.followers.total)} Followers</span>
            <span>{playlist.tracks.total} Tracks</span>
        </p>
    </div>

    <div class="playlist-actions flex justify-end mt-[10px] mx-0 mb-[30px]">
        {#if data.user?.id === playlist.owner.id}
            <Button 
                element="a" 
                variant="outline" 
                href="/playlist/{playlist.id}/edit"
                on:click={(e) => {
                    e.preventDefault();
                    MicroModal.show('edit-playlist-modal');
                }}
            >Edit Playlist</Button>
        {:else if isFollowing !== null}
            <form 
                action={`?/${isFollowing ? 'unFollowPlaylist' : 'followPlaylist'}`} 
                class="follow-form" 
                method="POST"
                use:enhance={() => {
                    isLoadingFollow = true;
                    return async ({result}) => {
                        isLoadingFollow =false;
                        if(result.type === "success") {
                            await applyAction(result);
                            isFollowing = !isFollowing;
                        } else if (result.type === 'failure') {
                            toasts.error(result.data?.followError);
                        } else {
                            await applyAction(result);
                        }
                        followButton.focus();
                    };
                }}
            >
                <Button bind:this={followButton} element="button" type="submit" variant="outline flex items-center" disabled={isLoadingFollow}>{isFollowing ? 'Unfollow' : 'Follow'}
                    <Heart aria-hidden focusable="false" fill={isFollowing ? 'var(--text-color)': 'none'} class="ml-[10px] w-[22px] h-[22px]" />
                    <span class="visually-hidden">{playlist.name} playlist</span>
                </Button>
                {#if form && 'followForm' in form && form?.followError}
                    <p class="error text-right text-error text-[14px]">{form.followError}</p>
                {/if}
            </form>
        {/if}
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

<Modal id="edit-playlist-modal" title="Edit {playlist.name}">
    <PlaylistForm 
        action="/playlist/{playlist.id}/edit" 
        {playlist} 
        form={form && 'editForm' in form ? form : null} 
        on:success={() => {
            MicroModal.close('edit-playlist-modal');
            invalidate(`/api/spotify/playlists/${playlist.id}`)
        }}
    />
</Modal>