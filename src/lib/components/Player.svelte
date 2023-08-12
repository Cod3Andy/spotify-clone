<script lang="ts" context="module">
    let current: HTMLAudioElement;
</script>
<script lang="ts">
	import { Pause, Play } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
    export let track: Track;

    const dispatch = createEventDispatcher<{
        play: { track: Track };
        pause: { track: Track };

    }>();

    let audio: HTMLAudioElement;
    let paused = true;

    function onPlay() {
        if(current && current !== audio) {
            current.currentTime = 0;
            current.pause();
        }
        current = audio;
        dispatch('play', { track });
    }
    function onPause() {
        dispatch('pause', { track });
    }
</script>

<div class="player">
    <audio
        on:play={onPlay}
        on:pause={onPause}
        class="hidden" 
        bind:this={audio} 
        bind:paused 
        controls 
        src={track.preview_url} 
        preload="none" 
    />
    <button class="w-3 h-3 p-0 bg-transparent border-none cursor-pointer" aria-label={paused ? `Play ${track.name}` : `Pause ${track.name}`} on:click={() => {
        if(paused) {
            audio.play();
        } else {
            audio.pause();
        }
        }}
        >
        {#if paused}
        <Play color="var(--text-color)" class="fill-text-color w-3 h-3" focusable="false" aria-hidden />
        {:else}
        <Pause color="var(--text-color)" class="fill-text-color w-3 h-3" focusable="false" aria-hidden />
        {/if}
    </button>
</div>
<style>
    html.no-js .player audio {
        @apply block w-[200px];
    }
    html.no-js .player button {
        @apply hidden;
    }
</style>