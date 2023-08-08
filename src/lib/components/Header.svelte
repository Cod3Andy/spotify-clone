<script>
	import { browser } from "$app/environment";
    import Navigation from "./Navigation.svelte";

</script>
<div class="contet flex justify-between items-center w-full">
    <div class="left">
        {#if browser}
            <Navigation desktop={false}/>
        {/if}
    </div>
    <div class="right">
        Right
    </div>
</div>
