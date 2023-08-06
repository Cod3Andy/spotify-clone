<script lang="ts">
    import Navigation from '$components/Navigation.svelte';
    import 'modern-normalize/modern-normalize.css';
    import "../app.css";
	import type { LayoutData } from './$types';

    export let data: LayoutData;

    $: user = data.user;
</script>

<div id="main" class="flex ">
    {#if user}
        <div id="sidebar">
            <Navigation desktop={true} />
        </div>
    {/if}
    <div id="content" class="flex-1">
        <main id="main-content" class="pt-[30px] pb-[60px] px-[15px] md:px-[30px]">
            <slot />
        </main>
    </div>
</div>
