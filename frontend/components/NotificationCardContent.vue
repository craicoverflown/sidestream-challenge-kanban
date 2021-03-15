<template>
  <div class="flex items-center w-64">
    <div class="mt-0.5 font-normal">
      <div class="text-sm text-black">{{ text }}</div>
      <div class="text-xs font-bold">{{ getElapsedTimeFromNow(time) }}</div>
    </div>
  </div>
</template>

<script>
import { getElapsedTimeFromNow } from "../utils/timeManager";

export default {
  props: ["text", "time"],
  data() {
    return { getElapsedTimeFromNow };
  }
};
</script>
