<script lang="ts">
    import { Button } from '$components';
    import logo from '$assets/Spotify_Logo_RGB_White.png';
    import cover from '$assets/cover.png';
</script>

<div class="wrapper flex flex-col md:flex-row items-center w-full max-w-[1200px] mt-[80px] mx-auto mb-0">
    <div class="content flex-[1.8]">
        <img src={logo} class="logo" alt="Spotify" />
        <h1 class="">EGP 0.00 for 3 months of Premium</h1>
        <p class="">Enjoy ad-free music listening, offline playback, and more. Cancel anytime.</p>
        <div class="buttons mt-[40px] mr-[10px]">
            <Button 
            element="a" 
            variant="outline" 
            href="https://www.spotify.com/"
            target="_blank"
            rel="noopener noreferrer">Sign Up</Button>
            <Button element="a" href="api/auth/login">Login</Button>
        </div>
    </div>
    <div class="cover flex-[1] mt-[40px] md:mt-0 md:ml-5">
        <img src={cover} alt="Svelte album cover" class="max-w-full" />
    </div>
</div>