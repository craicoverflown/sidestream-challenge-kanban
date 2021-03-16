<template>
  <button
    class="bg-blue-400 shadow-xl hover:bg-blue-700 hover:shadow-xl transition duration-500 transform hover:-translate-y-2 focus:outline-none text-white font-bold py-4 px-4 rounded-full"
    v-bind:title="tooltipText"
    v-on:click="action"
    v-if="isVisible"
  >
    <MaterialIcon
      v-bind:class="'fill-current text-white'"
      v-bind:iconType="iconType"
      v-bind:size="36"
    />
    <slot />
  </button>
</template>

<script>
export default {
  props: ["tooltipText", "action", "isVisible", "iconType"]
};
</script>
