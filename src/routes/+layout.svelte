<script lang="ts">
    import {Navigation, Header} from '$components';
    import 'modern-normalize/modern-normalize.css';
    import "../app.css";
	import type { LayoutData } from './$types';

    let topbar: HTMLElement;
    let scrollY: number;
    let headerOpacity = 0;

    $: if(topbar) {
        headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
    }

    export let data: LayoutData;

    $: user = data.user;
</script>

<svelte:window bind:scrollY />

<div id="main" class="flex">
    {#if user}
        <div id="sidebar">
            <Navigation desktop={true} />
        </div>
    {/if}
    <div id="content" class="flex-1">
        <div id="topbar" bind:this={topbar} class="flex items-center fixed z-[100] w-full h-header-height py-0 px-[15px] md:px-[30px] md:w-[calc(100%-250px)]">
            <div class="topbar-bg bg-header-color absolute z-[-1] w-full h-full top-0 left-0" style:opacity={`${headerOpacity}`} />
            <Header />
        </div>
        <main id="main-content" class:logged-in={user} class="pb-[60px] px-[15px] md:px-[30px]">
            <slot />
            <div class="h-[700px]"></div>
        </main>
    </div>
</div>

<style>
    .logged-in {
        @apply pt-[calc(30px+64px)];
    }
</style>
