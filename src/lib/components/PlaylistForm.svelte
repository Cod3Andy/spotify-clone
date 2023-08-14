<script lang="ts">
	import { Button } from "$components";
    import type { ActionData as AddActionData } from '../../routes/playlists/new/$types';
    import type { ActionData as EditActionData } from "../../routes/playlist/[id]/edit/$types";
	import { applyAction, enhance } from "$app/forms";
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{
        success: {};
        redirect: {};
    }>();

    let isLoading = false;

    export let form: AddActionData | EditActionData;
    export let userID: string | undefined = undefined;
    export let action: string | undefined = undefined;
    export let playlist: SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified | undefined = undefined;
</script>

<form method="POST" {action} use:enhance={() => {
    isLoading = true;
    return async ({result}) => {
        await applyAction(result);
        isLoading = false;
        if(result.type === 'success') {
            dispatch('success')
        }
        if(result.type === 'redirect') {
            dispatch('redirect')
        }
    };
}}>
    {#if userID}<input hidden name="userID" value={userID} />{/if}
    <div class="field" class:has-error={form?.nameError}>
        <label for="playlist-name">Name *</label>
        <input 
            type="text" 
            id="playlist-name" 
            name="name" 
            placeholder="Playlist Name" 
            value={form?.name || playlist?.name || ''}
        />
        {#if form?.nameError}
            <p class="error">{form?.nameError}</p>
        {/if}
    </div>
    <div class="field">
        <label for="playlist-description">Description</label>
        <input 
            type="text" 
            id="playlist-description" 
            name="description" 
            placeholder="Playlist Description" 
            value={form?.description || playlist?.description || ''}
        />
    </div>
    {#if form?.apiError}
        <p class="error">{form.apiError}</p>
    {/if}

    <div class="sumbit-button text-right mt-10">
        <Button disabled={isLoading} element="button" type="submit">{playlist ? 'Save' : 'Create'} Playlist</Button>
    </div>
</form>

<style>
    form {
        @apply max-w-[400px];
    }
    .field {
        @apply mb-5;
        &.has-error input {
            @apply outline-2 outline-error;
        }
    }
    label {
            @apply inline-block mb-[10px] text-[14px];
        }
    input {
        @apply w-full;
    }
    p.error {
        @apply text-error text-[14px] mt-[10px] mx-0 mb-0;
    }
</style>