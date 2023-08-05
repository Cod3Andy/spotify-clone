<script lang="ts">
    import 'modern-normalize/modern-normalize.css';
    import "../app.css";
	import type { LayoutData } from './$types';
    import { LogoutButton } from '$components';

    export let data: LayoutData;

    $: user = data.user;
</script>

{#if data.user}
    <p>Hello {user?.display_name}</p>
    <LogoutButton />
{/if}

<slot />