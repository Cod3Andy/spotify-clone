<script lang="ts">
	import { Player } from '$components';
    import { msToTime } from '$helpers';
	import { Clock8, ListPlus } from 'lucide-svelte';
    import playingGif from '$assets/playing.gif';

    let currentlyPlaying: string | null = null;
    let isPaused: boolean = false;

    export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];
</script>

<div class="tracks">
    <div class="row-header flex items-center py-[7px] px-[5px] border-b-[1px] border-border p-[5px] mb-[15px]">
        <div class="number-column flex justify-end w-[30px] mr-[15px]">
            <span class="number text-light-gray text-[14px]">#</span>
        </div>
        <div class="info-column">
            <span class="track-title text-light-gray text-[12px] uppercase">Title</span>
        </div>
        <div class="duration-column">
            <Clock8 aria-hidden focusable="false" color="var(--light-gray)" class="w-[16px] h-[16px]" />
        </div>
        <div class="actions-column"></div>
    </div>
    {#each tracks as track, index}
        <div class:is-current={currentlyPlaying === track.id} class="row flex items-center py-[7px] px-[5px] rounded-[4px] hover:bg-white/5">
            <div class="number-column flex justify-end w-[30px] mr-[15px]">
                {#if currentlyPlaying === track.id && !isPaused}
                    <img class="playing-gif w-3 " src={playingGif} alt="" />
                {:else}
                    <span class="number text-light-gray text-[14px]">{index + 1}</span>
                {/if}
                <div class="player hidden">
                    <Player 
                        {track} 
                        on:play={(e) => {
                            currentlyPlaying = e.detail.track.id;
                            isPaused = false;
                        }}
                        on:pause={(e) => {
                            isPaused = e.detail.track.id === currentlyPlaying;
                        }}
                    />
                </div>
            </div>
            <div class="info-column">
                <div class="track-title">
                    <h4>{track.name}</h4>
                    {#if track.explicit}
                        <span class="explicit">Explicit</span>
                    {/if}
                </div>
                <p class="artists text-light-gray text-[13px] mt-[7px] px-0 pb-0 leading-none">
                    {#each track.artists as artist, artistIndex}
                        <a href="/artists/{artist.id}" class="text-inherit no-underline" >{artist.name}</a>{#if artistIndex <
                        track.artists.length - 1}{', '}{/if}
                    {/each}
                </p>
            </div>
            <div class="duration-column">
                <span class="duration text-light-gray text-[14px]">{msToTime(track.duration_ms)}</span>
            </div>
            <div class="actions-column ">
                <ListPlus aria-hidden focusable="false" color="var(--light-gray)" />
            </div>
        </div>
    {/each}
</div>
<style>
    .info-column {
        @apply flex-1;
        &.track-title {
            @apply flex items-center;
            &h4 {
                @apply m-0 text-[15px] font-normal leading-none;
            }
            &span.explicit {
                @apply uppercase text-[8px] ml-[10px] border-solid border-[1px] py-[2px] px-[3px] rounded-[2px] leading-[10px] text-light-gray;
            }
        }
    }
    .actions-column {
        @apply w-[30px] ml-[15px];
    }
    .is-current .info-column .track-title h4, .is-current .number-column span.number {
        @apply text-accent-color;
    }
    .row {
        &:not(.header) {
            &:hover .number-column .player {
                @apply block;
            }
            &:hover .number-column span.number {
                @apply hidden;
            }
            &:hover .number-column .playing-gif {
                @apply hidden;
            }
        } 
    }
    /* BAD CODE ^^^ HOW TO DO THE SAME IN TAILWIND??? */
</style>