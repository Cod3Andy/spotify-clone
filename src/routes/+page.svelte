<script lang="ts">
	import { Button, Card } from "$components";
    import type { PageData } from "./$types";

    export let data: PageData;
    
    let sections: {
        title: string;
        path: string;
        items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[];
    }[] = [];

    $: {
        if(data.newReleases) {
            sections.push({
                title: 'New Releases',
                path: '/sections/new-releases',
                items: data.newReleases.albums.items
            });
        }
        if(data.featuredPlaylists) {
            sections.push({
                title: 'Featured Playlists',
                path: '/sections/featured-playlists',
                items: data.featuredPlaylists.playlists.items
            });
        }
        data.homeCategories.forEach((category, index) => {
            const categoryPlaylist = data.categoriesPlaylists[index];
            if(categoryPlaylist) {
                sections.push({
                    title: category.name,
                    path: `/category/${category.id}`,
                    items: categoryPlaylist.playlists.items
                });
            }
        });
        if(data.userPlaylists) {
            sections.push({
                title: 'Your Playlists',
                path: '/playlists',
                items: data.userPlaylists.items
            });
        }
    };
</script>

{#each sections as section}
    <section class="content-row mb-[40px]">
        <div class="content-row-header flex items-center justify-between mb-5">
            <div class="right">
                <h2 class="section-title text-[22px] font-semibold m-0">{section.title}</h2>
            </div>
            <div class="left">
                <Button element="a" href={section.path} variant="outline"
                >See All<span class="visually-hidden">{section.title}</span></Button>
            </div>
        </div>
        <div class="grid-items">
            {#each section.items as item}
                <div class="grid-item">
                    <Card {item} />
                </div>
            {/each}
        </div>
    </section>
{/each}