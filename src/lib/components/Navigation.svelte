<script lang="ts">
    import { Home, Search, ListMusic, Menu, X, type Icon } from "lucide-svelte";
    import { IconButton } from "$components";
    import { tick, type ComponentType } from "svelte";
    import logo from '$assets/Spotify_Logo_RGB_White.png';
	import { page } from "$app/stores";
    import { fade } from "svelte/transition";
	import { beforeNavigate } from "$app/navigation";
    export let desktop: boolean;

    let isMobileMenuOpen = false;
    $: isOpen = desktop || isMobileMenuOpen;

    let openMenuButton: IconButton;
    let closeMenuButton: IconButton;
    let lastFocusableElement: HTMLAnchorElement;

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
        closeMenuButton.getButton().focus();
    };
    const closeMenu = () => {
        isMobileMenuOpen = false;
        openMenuButton.getButton().focus();
    };

    const moveFocusToBottom = (e: KeyboardEvent) => {
        if(desktop) return;
        if(e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            lastFocusableElement.focus();
        }
    };

    const moveFocusToTop = (e: KeyboardEvent) => {
        if(desktop) return;
        if(e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            closeMenuButton.getButton().focus();
        }
    };
    const handleEscape = (e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            closeMenu();
        }
    };

    beforeNavigate(() => {
        isMobileMenuOpen = false;
    });
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

<div class="nav-content sticky top-0" class:desktop class:mobile={!desktop}>
    {#if !desktop && isMobileMenuOpen}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
            on:click={closeMenu} 
            on:keyup={handleEscape} 
            class="overlay fixed w-full h-full top-0 left-0 bg-sidebar-color opacity-75 z-[100] md:hidden" 
            transition:fade={{ duration: 200 }} 
        />
    {/if}
    <nav aria-label="Main">
        {#if !desktop}
            <IconButton 
            icon={Menu} 
            label="Open Menu" 
            bind:this={openMenuButton} 
            on:click={openMenu} 
            aria-expanded={isOpen}
            class="menu-button"
            />
             <!-- CLASS FIX IS NEEDED!!!!! -->
        {/if}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div 
            class="nav-content-inner hidden md:block p-5 min-w-sidebar-width bg-sidebar-color h-[100vh] overflow-auto"
            class:is-hidden={!isOpen} 
            style:visibility={isOpen ? 'visible' : 'hidden'}
            on:keyup={handleEscape}
        >
            {#if !desktop}
                <IconButton 
                    icon={X} 
                    label="Close Menu"
                    bind:this={closeMenuButton} 
                    on:click={closeMenu} 
                    on:keydown={moveFocusToBottom}
                    class="close-menu-button"
                />
                <!-- CLASS FIX IS NEEDED!!!!! -->
            {/if}
            <img src={logo} class="logo max-w-full w-[130px]" alt="Spotify" />
            <ul class="p-0 mt-5 mx-0 mb-0 list-none">
                {#each menuItems as item, index}
                {@const iconProps = {
                    focusable: "false",
                    'aria-hidden': true,
                    color: "var(--text-color)",
                    size: 26,
                    strokeWidth: 2
                }}
                    <li class:active={item.path === $page.url.pathname}>
                        {#if menuItems.length === index + 1}
                        <a bind:this={lastFocusableElement} href={item.path} on:keydown={moveFocusToTop} class="flex items-center no-underline text-text-color text-sm font-medium p-[5px] my-[10px] mx-0 opacity-70 transition-opacity active:opacity-100 hover:opacity-100 focus:opacity-100">
                            <svelte:component this={item.icon} {...iconProps} />
                        {item.label}
                        </a>
                        {:else}
                        <a href={item.path} class="flex items-center no-underline text-text-color text-sm font-medium p-[5px] my-[10px] mx-0 opacity-70 transition-opacity active:opacity-100 hover:opacity-100 focus:opacity-100">
                            <svelte:component this={item.icon} {...iconProps} />
                            {item.label}
                        </a>
                        {/if}
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
    :global(.close-menu-button) {
        position: absolute;
        right: 20px;
        top: 20px;
    }
</style>