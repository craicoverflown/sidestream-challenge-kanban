<template>
  <button
    class="bg-green-400 shadow-xl hover:bg-green-700 hover:shadow-xl transition duration-500 transform hover:-translate-y-2 text-white font-bold py-2 px-4 rounded-full"
    v-on:click="action"
    v-if="disabled"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: ["buttonText", "action", "disabled"]
};
</script>
