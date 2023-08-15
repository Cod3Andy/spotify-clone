<script lang="ts">
	import type { Icon } from "lucide-svelte";
	import type { ComponentType } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

    interface $$Props extends HTMLButtonAttributes {
        icon: ComponentType<Icon>;
        label: string;
    };

    export let icon: ComponentType<Icon>;
    export let label: string;

    let button: HTMLButtonElement;
    
    export function getButton() {
        return button;
    };
</script>
<button bind:this={button} on:click on:mouseover on:focus on:keydown {...$$restProps} 
    class={`${$$restProps.class} border-none bg-none justify-center bg-transparent cursor-pointer p-0 w-[38px] h-[38px] text-text-color disabled:opacity-60 disabled:cursor-not-allowed active:bg-menu-background-color`}
    >
    <svelte:component this={icon} aria-hidden="true" focusable="false" class="md:hidden" />
    <span class="visually-hidden">{label}</span>
</button>

