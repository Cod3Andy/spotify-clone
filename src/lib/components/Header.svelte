<script lang="ts">
	import { browser } from "$app/environment";
    import { Navigation, LogoutButton } from "$components";
    import { page } from "$app/stores";
    import { ChevronDown, ExternalLink } from "lucide-svelte";
	import { tippy } from "$actions";

    $: user = $page.data.user;
</script>
<div class="contet flex justify-between items-center w-full">
    <div class="left">
        {#if browser}
            <Navigation desktop={false}/>
        {/if}
    </div>
    <div class="right">
        <div id="profile-button">
            <button 
                use:tippy={{ content: document.getElementById('profile-menu') || undefined,
                    onMount: () => {
                        const template = document.getElementById('profile-menu');
                        if(template) {
                            template.style.display = 'block';
                        }
                    },
                    trigger: 'click',
                    placement: 'bottom-end',
                    interactive: true,
                    theme: 'menu'
                }} 
                class="profile-button flex items-center text-text-color bg-none bg-transparent hover:bg-accent-color p-[5px] rounded-[25px] border-border border-[1px] border-solid cursor-pointer">
                {#if user?.images && user.images.length > 0}
                    <img class="w-7 h-7 rounded-full mr-[10px]" src={user.images[0].url} alt="" />
                {/if}
                {user?.display_name} <span
                class="visually-hidden">Profile Menu</span>
                <ChevronDown class="profile-arrow ml-[3px]" size={22} />
            </button>
        </div>
        <div id="profile-menu" class="hidden">
            <div class="profile-menu-content py-[5px] px-0">
                <ul class="p-0 m-0 list-none">
                    <li >
                        <a 
                            href={user?.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            >View on Spotify 
                            <ExternalLink 
                                focusable="false" 
                                class="align-middle ml-[10px]" 
                                aria-hidden 
                                size={20} 
                            />
                        </a>
                    </li>
                    <li>
                        <a href="/profile">View Profile</a>
                    </li>
                    <li class="flex items-center py-[10px] px-[15px] bg-transparent border-0 no-underline cursor-pointer text-menu-text-color w-full text-left text-[14px] hover:bg-black/[0.1]"><LogoutButton /></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<style>
    ul li  a {
     @apply flex items-center py-[10px] px-[15px] bg-transparent border-0 no-underline cursor-pointer text-menu-text-color w-full text-left text-[14px];
        &:hover {
            @apply bg-black/[0.1];
        }
    }
</style>