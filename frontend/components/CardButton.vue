<template>
  <div class="flex items-center">
    <button
      class="bg-white transition duration-500 ease-in-out hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded p-1"
      v-on:click="buttonMethod(index)"
    >
      {{ buttonName }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["index", "buttonName", "buttonMethod"]
};
</script>
