<script lang="ts">
    import { Home, Search, ListMusic, type Icon } from "lucide-svelte";
    import type { ComponentType } from "svelte";
    import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from "$app/stores";
    export let desktop: boolean;

    const menuItems: {path: string, label: string, icon: ComponentType<Icon>}[] = [
        {
            path: '/',
            label: "Home",
            icon: Home
        },
        {
            path: '/search',
            label: "Search",
            icon: Search
        },
        {
            path: '/playlists',
            label: "Playlists",
            icon: ListMusic
        }
    ];
</script>

<div class="nav-content " class:desktop class:mobile={!desktop}>
    <nav aria-label="Main">
        <div class="nav-content-inner sticky hidden md:block top-0 p-5 min-w-sidebar-width bg-sidebar-color h-[100vh] overflow-auto">
            <img src={logo} class="logo max-w-full w-[130px]" alt="Spotify" />
            <ul class="p-0 mt-5 mx-0 mb-0 list-none">
                {#each menuItems as item}
                    <li class:active={item.path === $page.url.pathname}>
                        <a href={item.path} class="flex items-center no-underline text-text-color text-sm font-medium p-[5px] my-[10px] mx-0 opacity-70 transition-opacity active:opacity-100 hover:opacity-100 focus:opacity-100">
                            <svelte:component 
                                this={item.icon} 
                                focusable="false" 
                                aria-hidden="true" 
                                color="var(--text-color)"
                                size={26}
                                strokeWidth={2}
                            />
                            {item.label}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </nav>
</div>