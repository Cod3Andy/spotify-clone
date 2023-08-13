<script lang="ts">
	import {Card, Button, Pagination} from "$components";
	import { toasts } from "$stores";
    import type { PageData } from "./$types";

    export let data: PageData;

    let isLoading = false;

    $:playlists = data.userPlaylists;

    async function loadMoreItems() {
        if(!playlists.next) return
        isLoading = true;
        const res = await fetch(playlists.next.replace('https://api.spotify.com/v1/', '/api/spotify/'));
        if(res.ok) {
            const resJSON = await res.json();
            playlists = {
                ...resJSON, items: [...playlists.items, ...resJSON.items]
            };
        } else {
            toasts.error('Could not load data!');
        }
        isLoading = false;
    }
</script>

<div class="content pb-[60px]">
    {#if playlists.items.length > 0}
        <div class="title flex items-center justify-between">
            <h1>{data.title}</h1>
            <Button element="a" href="/playlists/new">+ Add New</Button>
        </div>
            <div class="grid-items mb-10">
               {#each playlists.items as item}
                    <Card {item} />
               {/each}
            </div>
            <Pagination paginatedList={playlists} on:loadmore={loadMoreItems} {isLoading} />
        {:else}
        <div class="empty text-center mt-10 ">
            <p class="text-[22px] font-semibold">No playlists yet!</p>
            <Button element="a" href="/playlists/new">+ Add New</Button>
        </div>
    {/if}
</div>