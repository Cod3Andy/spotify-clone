<script lang="ts">
    export let element: 'button' | 'a';
    export let variant: 'solid' | 'outline' | 'danger' = 'solid';
    export let className: string = '';
</script>

<svelte:element this={element} class="button button-{variant} {className}" on:click {...$$restProps}>
    <slot />
</svelte:element>

<style>
    .button {
        @apply border-none font-semibold text-[14px] rounded-[20px] cursor-pointer py-[7px] px-[15px] no-underline;
        &.button-solid {
            @apply bg-accent-color text-[#000] border-2 border-solid border-accent-color;
        }
        &.button-outline {
            @apply bg-transparent text-text-color border-2 border-solid;
        }
        &.button-danger {
            @apply bg-error text-[#fff] border-2 border-solid border-error;
        }
        &:disabled {
            @apply opacity-80 cursor-not-allowed;
        }
        &:hover {
            &.button-solid, 
            &.button-danger {
                @apply bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.1)];
            }
            &.button-outline {
                @apply bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.1)];
            }
        }
        &:active {
            &.button-solid,
            &.button-danger {
                @apply bg-gradient-to-r from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.1)];
            }
            &.button-outline {
                @apply bg-gradient-to-r from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.1)];
            }
        }
    }
</style>