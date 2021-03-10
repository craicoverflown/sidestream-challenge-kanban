<template>
  <div class="flex fixed bottom-0 right-0 m-10">
    <button
      class="bg-green-400 shadow-xl hover:bg-green-700 hover:shadow-xl text-white font-bold py-2 px-4 rounded-full"
      v-on:click="action"
      v-if="disabled"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["buttonText", "action", "disabled"]
};
</script>
