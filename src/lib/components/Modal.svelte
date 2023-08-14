<script lang="ts">
	import { X } from "lucide-svelte";


    export let id:string;
    export let title:string;
</script>

<div {id} aria-hidden="true" class="modal hidden">
    <div tabindex="-1" data-micromodal-close class="modal-overlay flex justify-center items-center fixed top-0 left-0 bottom-0 right-0 z-[9999] bg-black/60">
      <div 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="{id}-title" 
        class="modal-content relative bg-dark-gray p-[30px] max-w-[400px] max-h-[100vh] overflow-y-auto rounded-[4px]" 
      >
        <header class="mr-[30px] ">
          <h2 id="{id}-title" class="text-[26px]">
            {title}
          </h2>
          <button 
            aria-label="Close modal" 
            data-micromodal-close
            class="close-button absolute top-[10px] right-[10px] bg-transparent border-none cursor-pointer" 
            >
            <X aria-hidden focusable="false" class="text-text-color" />
          </button>
        </header>
  
        <div id="{id}-content">
          <slot />
        </div>
      </div>
    </div>
  </div>