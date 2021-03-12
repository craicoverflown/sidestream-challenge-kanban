<template>
  <button
    class="transition duration-500 ease-in-out hover:opacity-25"
    v-bind:title="tooltipText"
    v-on:click="onClick"
  >
    <img v-bind:src="require('../assets/images/info-24px.svg')" />
  </button>
</template>

<script>
export default {
  props: ["tooltipText", "onClick", "data"]
};
</script>
