<template>
  <div class="flex justify-between space-x-4">
    <div>
      <h2 class="text-md font-bold text-black mb-0.5">
        Error Code {{ error.code }}
      </h2>
      <dl class="text-sm font-medium">
        <div class="mt-0.5 font-normal">
          <dt class="inline font-bold">Message:</dt>
          <dd class="inline text-black">{{ error.text }}</dd>
        </div>
      </dl>
    </div>
    <div class="flex items-center">
      <button
        class="bg-white hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded p-1"
        v-if="action"
        v-on:click="action.handleButtonClick(error.index)"
      >
        {{ action.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error", "action"]
};
</script>
