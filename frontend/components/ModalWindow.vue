<template>
  <div class="h-screen flex fixed inset-0 z-50">
    <div class="flex mx-auto p-10 m-20">
      <div
        class="bg-white w-96 relative shadow-2xl flex flex-col rounded p-2 space-y-2"
      >
        <ModalHeader :modalName="modalName" />
        <slot />
        <ModalBottomBar>
          <button
            class="rounded bg-green-500 hover:bg-green-600 transition duration-500 ease-in-out text-white px-4"
            @click="onClose"
          >
            Close
          </button>
        </ModalBottomBar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["modalName", "onClose"]
};
</script>
