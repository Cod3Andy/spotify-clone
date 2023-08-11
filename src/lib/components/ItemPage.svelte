<script lang="ts">
	import { Music } from "lucide-svelte";

    export let color: string | null;
    export let image: string | undefined;
    export let title: string;
    export let type: string | undefined;
</script>

<div class="banner flex flex-col relative sm:flex-row sm:items-end mt-[-94px] mx-[-30px] mb-0 pt-[94px] px-[30px] pb-[20px]">
    <div class="banner-gradient absolute top-0 left-0 z-[1] w-full h-[150%]" style:background-image='linear-gradient(0deg, transparent, {color || 'var(--light-gray)'}' />
    <div class="cover z-10 mr-0 mb-[30px] md:mr-[40px] md:mb-0">
        {#if image}
            <img src={image} alt={title} />
        {:else}
            <div class="cover-placeholder flex items-center justify-center bg-medium-gray">
                <Music focusable="false" aria-hidden class="w-[40%] h-[40%] text-light-gray" />
            </div>
        {/if}
    </div>
    <div class="info z-10">
        {#if type} <p class="type uppercase font-semibold text-[12px] m-0">{type}</p>{/if}
        <h1 class="title text-[32px] mt-[5px] mx-0 mb-0 md:text-[36px] lg:text-[54px]">{title}</h1>
        <slot name="meta" />
    </div>
</div>
<div class="content relative z-10 min-h-[300px] my-0 mx-[-30px] p-[30px] bg-gradient-to-t from-bg-color to-[rgba(0,0,0,0.1)] ">
    <slot />
</div>

<style>
    img, .cover-placeholder {
        @apply w-full aspect-square object-cover shadow-[0_0_50px_rgba(0,0,0,0.5)];
        @media (min-width: 640px) {
            @apply w-[230px];
        }
        @media (min-width: 768px) {
            @apply w-[200px];
        }
        @media (min-width: 1024px) {
            @apply w-[230px];
        }
    }
</style>