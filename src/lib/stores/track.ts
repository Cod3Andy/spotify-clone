import { writable } from 'svelte/store';

export const track = writable(<SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified>{});
export const tracks = writable(<SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[]>[]);
