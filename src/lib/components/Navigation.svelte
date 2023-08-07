<script lang="ts">
    import { Home, Search, ListMusic, type Icon } from "lucide-svelte";
    import { tick, type ComponentType } from "svelte";
    import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from "$app/stores";
    import { fade } from "svelte/transition";
	import { beforeNavigate } from "$app/navigation";
    export let desktop: boolean;

    let isMobileMenuOpen = false;
    $: isOpen = desktop || isMobileMenuOpen;

    let openMenuButton: HTMLButtonElement;
    let closeMenuButton: HTMLButtonElement;

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
    const openMenu = async () => {
        isMobileMenuOpen = true;
        await tick();
        closeMenuButton.focus();
    };
    const closeMenu = () => {
        isMobileMenuOpen = false;
        openMenuButton.focus();
    };

    beforeNavigate(() => {
        isMobileMenuOpen = false;
    })
</script>

<svelte:head>
    {#if !desktop && isMobileMenuOpen}
        <style>
            body {
                overflow: hidden;
            }
        </style>
    {/if}
</svelte:head>

<div class="nav-content" class:desktop class:mobile={!desktop}>
    {#if !desktop && isMobileMenuOpen}
        <div on:click={closeMenu} class="overlay fixed w-full h-full top-0 left-0 bg-sidebar-color opacity-75 z-[100] md:hidden" transition:fade={{duration:200}} />
    {/if}
    <nav aria-label="Main">
        {#if !desktop}
            <button bind:this={openMenuButton} on:click={openMenu} aria-expanded={isOpen}>Open</button>
        {/if}
        <div 
        class:is-hidden={!isOpen} 
        class="nav-content-inner sticky hidden md:block top-0 p-5 min-w-sidebar-width bg-sidebar-color h-[100vh] overflow-auto"
        style:visibility={isOpen ? 'visible' : 'hidden'}
        >
            {#if !desktop}
                <button bind:this={closeMenuButton} on:click={closeMenu}>Close</button>
            {/if}
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
<style>
    .mobile .nav-content-inner {
        @media (max-width: 768px) {
            @apply fixed top-0 left-0 z-[100] block;
            transition: transform 200ms, opacity 200ms;
            &.is-hidden {
                transition: transform 200ms, opacity 200ms, visibility 200ms;
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        @media (min-width: 768px) {
            @apply hidden;
        }
    }
</style>