<script lang="ts">
import { invalidateAll } from '$app/navigation';
</script>

<form method="POST" action="/api/auth/logout" class="flex items-center py-[10px] px-[15px] bg-transparent border-0 no-underline cursor-pointer text-menu-text-color w-full text-left text-[14px] hover:bg-black/[0.1]" 
on:submit|preventDefault={async () => {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
            accept: 'application/json',
        },
    });
    if(response.ok) {
        invalidateAll();
    }
}}>
    <button type="submit" class="flex w-full h-full">Logout</button>
</form>