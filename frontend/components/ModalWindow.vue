<template>
  <div class="h-screen flex fixed inset-0 z-50">
    <div
      class="bg-white flex relative mx-auto max-w-2xl shadow-2xl rounded p-6 m-20"
    >
      <div class="flex flex-col space-y-2">
        <div class="overflow-y-auto">
          <slot />
        </div>
        <div class="flex justify-end">
          <button
            class="rounded bg-green-500 hover:bg-green-600 transition duration-500 ease-in-out text-white px-4"
            @click="onClose"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["onClose"]
};
</script>
