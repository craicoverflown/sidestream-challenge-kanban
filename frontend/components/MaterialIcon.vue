<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    v-bind:height="`${size}px`"
    v-bind:width="`${size}px`"
    viewBox="0 0 24 24"
    fill="#000000"
  >
    <path v-if="iconType === ICON_TYPE.ADD" v-bind:d="ICON_PATH.ADD" />
    <path
      v-else-if="iconType === ICON_TYPE.RESOLVE"
      v-bind:d="ICON_PATH.RESOLVE"
    />
    <path
      v-else-if="iconType === ICON_TYPE.UNRESOLVE"
      v-bind:d="ICON_PATH.UNRESOLVE"
    />
    <path v-else-if="iconType === ICON_TYPE.INFO" v-bind:d="ICON_PATH.INFO" />
    <path v-else-if="iconType === ICON_TYPE.UNDO" v-bind:d="ICON_PATH.UNDO" />
    <path
      v-else-if="iconType === ICON_TYPE.UNDO_ALL"
      v-bind:d="ICON_PATH.UNDO_ALL"
    />
  </svg>
</template>

<script>
import { ICON_TYPE, ICON_PATH } from "../constants/enums";

export default {
  props: ["iconType", "size"],
  data() {
    return { ICON_TYPE, ICON_PATH };
  }
};
</script>
