<template>
  <button
    class="transition duration-500 ease-in-out focus:outline-none hover:opacity-25"
    v-bind:title="tooltipText"
    v-on:click="onClick"
  >
    <MaterialIcon :iconType="'info'" :size="24" />
  </button>
</template>

<script>
export default {
  props: ["tooltipText", "onClick"]
};
</script>
