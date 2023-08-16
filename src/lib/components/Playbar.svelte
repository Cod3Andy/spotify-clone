<script lang="ts">
	import { Heart, ListMusic, MonitorSmartphone, Play, PlaySquare, Repeat2, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-svelte";
    import { page } from "$app/stores";
    import { Howl, Howler } from 'howler';
    import { onMount, onDestroy } from 'svelte';
    import { track, tracks } from "$stores/track";
    import Player from "./Player.svelte";
    // import track from '$components/Player.svelte';
    // import current from '$components/Player.svelte';
    let duration = 0;
    let time = 0;
    let playing = false;
    let currentSound: { duration: () => number; seek: (arg0: number | undefined) => number; play: () => void; pause: () => void; } | null = null;
    let progress: number = 0;
    let volume: number = 0.5;
    let paused: boolean = true;
    let unsubscribe = () => {};
    let audio = new Howl({
        src: $track.preview_url,
    });

    $: percent = ((time / duration) * 100).toFixed(2) || 0;

    onMount(function initPlayer() {
    unsubscribe = tracks.subscribe(function (value) {
    if (Object.keys($track).length || !value.length) return;

    $track = value.shift();
    tracks.set(value);
    currentSound = createCurrentSong();
    });

    Howler.volume(volume);
    loadNewSong();
    currentSound = createCurrentSong();
    });

    onDestroy(unsubscribe);
    function loadNewSong() {
    if (Object.keys($track).length || !$tracks.length) {
    return;
    }

    nextFromPlaylist();
    }
    function resetSongStatus() {
    $track = {};
    currentSound = null;
    duration = 0;
    time = 0;
    playing = false;
    };
    
    function createCurrentSong() {
    const playing1 = playing;
    return new Howl({
    src: [$track.preview_url],
    xhrWithCredentials: true,
    preload: true,
    html5: false,
    pool: 0,
    onload: function setupSong() {
      duration = currentSound.duration();
      time = $track.duration_ms;

      if (time) {
        currentSound.seek(time);
      }

      if (playing1) {
        playSound();
      }
    },
    onend: function cleanupSong() {
      $track = {};
      if ($tracks.length) {
        loadNewSong();
      } else {
        resetSongStatus();
      }
    },
    });
    };
    function nextFromPlaylist() {
    $track = $tracks.shift();
    $tracks = $tracks; //TODO: nicer solution xD
    currentSound = createCurrentSong();
    };

    function playSound() {
        currentSound.play();
        playing = true;

        const pollingSongData = setInterval(function updateTimer() {
            if (!playing) {
            time = 0;
            clearInterval(pollingSongData);
            return;
            }

            time = currentSound.seek();
        }, 200);
        };

        function pauseSound() {
        currentSound.pause();
        playing = false;
    };

    
    $: user = $page.data.user;
    console.log(track);
</script>
    <audio
        on:play={playSound}
        on:pause={pauseSound}
        bind:this={audio} 
        bind:paused 
        controls 
        src={$track.preview_url} 
        preload="none" 
    />
<section class="playbar flex z-50 gap-28 sticky bottom-0 w-full h-[13vh] bg-black">
    <div class="track-info flex items-center w-[22%] ml-4 gap-2">
        <img src={user.images[0].url} alt="" class="w-14 h-14 rounded-sm">
        <div class="info flex flex-col w-[80%]">
            <span class="title text-[14px] font-medium truncate cursor-pointer hover:underline">Instrument of Surrender</span>
            <span class="artist text-[11px] font-light truncate cursor-pointer hover:underline">Sea Power</span>
        </div>
        <button class="cursor-pointer">
            <Heart class="w-[18px] h-[18px] text-text-color hover:text-white hover:scale-105" />
        </button>
    </div>
    <div class="controls flex flex-col gap-1 w-[35%]">
        <div class="player-controls-top flex justify-center align-center gap-3 items-center mt-3">
            <button class="cursor-default">
                <Shuffle focusable="false" aria-hidden class="w-[18px] h-[18px] text-light-gray hover:text-white" />
            </button>
            <button class="cursor-default">
                <SkipBack fill="var(--light-gray)" focusable="false" aria-hidden class="w-5 h-5 text-light-gray hover:text-white hover:fill-white" />
            </button>
            <button on:click={playSound} class="cursor-default">
                <Play class="pl-[5px] py-[2px] pr-[2px] w-9 h-9 fill-black bg-white rounded-full hover:scale-105" focusable="false" aria-hidden />
            </button>
            <SkipForward fill="var(--light-gray)" focusable="false" aria-hidden class="w-5 h-5 text-light-gray hover:text-white hover:fill-white" />
            <button class="cursor-default">
                <Repeat2 focusable="false" aria-hidden class="w-5 h-5 text-light-gray hover:text-white" />
            </button>
        </div>
        <div class="player-controls-bottom flex justify-center items-center align-middle">
            <span class="current-time text-text-color text-[11px]">0:00</span>
            <div class="player-slider w-[90%] mb-1 mx-2 relative">
                <div class="progress z-20" style="width: {progress}%"></div>
                <input type="range" min="0" max="100" step="1" bind:value={progress} class="seek-slider m-0 p-0 absolute h-[4px] appearance-none w-full bg-light-gray">
            </div>
            <span class="duration-time text-text-color text-[11px]">5:45</span>
        </div>
    </div>
    <div class="volume-controls flex justify-end items-center w-[23%]">
        <button>
            <PlaySquare class="w-5 h-5 text-light-gray hover:text-white hover:scale-105" />
        </button>
        <button>
            <ListMusic class="w-5 h-5 text-light-gray hover:text-white hover:scale-105"/>
        </button>
        <button class="cursor-default">
            <MonitorSmartphone class="w-5 h-5 text-light-gray hover:text-white" />
        </button>
        <div class="flex items-center w-[50%]">
            <button class="cursor-default">
                <Volume1 class="w-5 h-5 text-light-gray hover:text-white" />
            </button>
            <div class="volume-slider relative w-full">
                <div class="progress z-20" style="width: {volume * 100}%"></div>
                <input type="range" min="0" max="1" step="0.01" bind:value={volume} class="w-full mb-3 h-[4px] m-0 p-0 absolute appearance-none bg-light-gray rounded-[5px] border-none">
            </div>
        </div>
    </div>
</section>

<style>
    .progress {
    transition: width 0.1 linear;
    @apply absolute rounded-md bg-accent-color w-full h-[4px];
    }

    input::-webkit-slider-thumb {
        @apply w-3 h-3 z-30 bg-white border-2 rounded-[50%] cursor-pointer appearance-none;
       
    }
    input::-moz-range-thumb {
        @apply w-2 h-2 z-30 bg-white border-2 rounded-[50%] cursor-pointer appearance-none;
    }
</style>