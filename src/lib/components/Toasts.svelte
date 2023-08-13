<script lang="ts">
    import { toasts } from "$stores";
	import { X } from "lucide-svelte";
	import { flip } from "svelte/animate";
	import { fly } from "svelte/transition";
</script>

{#if $toasts.length > 0}
    <div class="toasts fixed top-0 right-0 p-5 w-full max-w-[300px] z-[9999] max-h-[100vh] overflow-auto">
        {#each $toasts as toast (toast.id)}
            <div 
                transition:fly={{x: 100, duration: 300}} 
                animate:flip={{duration: 300}} 
                class="toast {toast.type} relative bg-accent-color shadow-sm rounded-[2px] py-[10px] px-5 mb-[10px] font-medium">
                <div class="content" role="status">
                    {toast.message}
                </div>
                <button class="absolute top-0 right-0 close bg-transparent p-[5px] border-none cursor-pointer" aria-label="Close toast" on:click={() => {
                    toasts.remove(toast.id)
                }}>
                    <X focusable="false" aria-hidden color="var(--text-color)" class="w-[18px] h-[18px]" />
                </button>
            </div>
        {/each}
    </div>
{/if}

<style>
    .toast.error {
        @apply bg-error;
    }
    .toast.warning {
        @apply bg-warning;
    }
</style>