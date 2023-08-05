<script lang="ts">
    import 'modern-normalize/modern-normalize.css';
    import "../app.css";
	import type { LayoutData } from './$types';

    export let data: LayoutData;

    $: user = data.user;
</script>

<div id="main">
    <div id="content">
        <main id="main-content" class="pt-[30px] pb-[60px] px-[15px] md:px-[30px]">
            <slot />
        </main>
    </div>
</div>
