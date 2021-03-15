<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    v-bind:height="`${size}px`"
    v-bind:width="`${size}px`"
    viewBox="0 0 24 24"
    fill="#000000"
  >
    <path v-bind:d="getMaterialIconByType(iconType)" />
  </svg>
</template>

<script>
import { getMaterialIconByType } from "../utils/materialIconManager";

export default {
  props: ["iconType", "size"],
  data() {
    return { getMaterialIconByType };
  }
};
</script>
