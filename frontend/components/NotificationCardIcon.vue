<template>
  <div class="flex items-center m-2">
    <div
      v-bind:class="
        `shadow-xl bg-${getColourByIconType(
          iconType
        )}-600 text-white rounded-full`
      "
    >
      <MaterialIcon
        v-bind:class="'fill-current p-1'"
        :iconType="iconType"
        :size="36"
      />
    </div>
  </div>
</template>

<script>
import { getColourByIconType } from "../utils/materialIconManager";

export default {
  props: ["iconType"],
  data() {
    return { getColourByIconType };
  }
};
</script>
