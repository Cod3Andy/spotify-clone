<script lang="ts">
    import {Navigation, Header, Toasts, Playbar} from '$components';
    import { page } from '$app/stores';
    import NProgress from 'nprogress';
    import MicroModal from 'micromodal';
    import { hideAll } from 'tippy.js';
    import {Howl, Howler} from 'howler';
    import 'nprogress/nprogress.css';
    import 'modern-normalize/modern-normalize.css';
    import "../app.css";
	import type { LayoutData } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { browser } from '$app/environment';

    NProgress.configure({ showSpinner: false });
    if (browser) {
        MicroModal.init();
    }

    let topbar: HTMLElement;
    let scrollY: number;
    let headerOpacity = 0;

    $: if(topbar) {
        headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
    }

    export let data: LayoutData;

    $: user = data.user;

    afterNavigate(() => {
        NProgress.done();
    });

    beforeNavigate(() => {
        NProgress.start();
        hideAll();
    });
</script>

<svelte:window bind:scrollY />

<svelte:head>
    <title>Spotify{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
</svelte:head>

{#if user}
    <a href="#main-content" class="skip-link">Skip to Content</a>
{/if}

<Toasts />

<div id="main" class="flex">
    {#if user}
        <div id="sidebar">
            <Navigation desktop={true} />
        </div>
    {/if}
    <div id="content" class="flex-1">
        {#if user}
            <div id="topbar" bind:this={topbar} class="flex items-center fixed z-[100] w-full h-header-height py-0 px-[15px] md:px-[30px] md:w-[calc(100%-250px)]">
                <div 
                    class="topbar-bg bg-gradient-to-t from-black/20 to-black/20 absolute z-[-1] w-full h-full top-0 left-0" 
                    style:opacity={`${headerOpacity}`} 
                    style:background-color={$page.data.color ? $page.data.color : "var(--header-color)"}
                />
                <Header />
            </div>
        {/if}
        <main id="main-content" class:logged-in={user} class="pb-[60px] px-[15px] md:px-[30px]">
            <slot />
        </main>
    </div>
</div>
<Playbar />

<style>
    .logged-in {
        @apply pt-[calc(30px+64px)];
    }
</style>
