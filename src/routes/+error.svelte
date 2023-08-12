<script lang="ts">
	import { invalidate } from "$app/navigation";
	import { page } from "$app/stores";
	import Button from "$components/Button.svelte";
	import LogoutButton from "$components/LogoutButton.svelte";

    let isRetrying = false;
    const retryRoutes = ['/album/[id]'];
</script>

<svelte:head>
    <title>{$page.status}</title>
</svelte:head>

<div class="content text-center">
    <h1 class="text-[40px]">{$page.error?.message}</h1>
    {#if $page.status === 404}
        <p class="text-[20px]">The page you're trying to access cannot be found.</p>
        <div class="buttons mt-[40px]">
            <Button element="a" href="/">Home</Button>
            <Button element="a" href="/search">Search</Button>
        </div>
    {/if}

    {#if $page.status === 401}
        <p>Your current session has expired, please logout and login again.</p>
        <div class="mr-[10px] p-0 uppercase bg-accent-color rounded-full">
            <LogoutButton /> 
        </div>
    {/if}

    {#if ![404,401].includes($page.status) && $page.route.id && retryRoutes.includes($page.route.id)}
        <div class="buttons">
            <Button 
                disabled={isRetrying} 
                element="button" 
                on:click={ async () => {
                isRetrying = true;
                await invalidate(`app:${$page.route.id}`);
                isRetrying = false;
            }}>Retry</Button>
        </div>
    {/if}
</div>