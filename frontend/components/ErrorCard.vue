<template>
  <div
    v-bind:class="
      `bg-${colour}-300 transition duration-500 ease-in-out hover:bg-${colour}-500 flex shadow-md justify-between space-x-4 rounded-xl p-2`
    "
  >
    <ErrorCardContent :errorCode="error.code" :errorMessage="error.text" />
    <ErrorCardButton
      :index="error.index"
      :buttonMethod="action.handleButtonClick"
      :buttonData="buttonData[group]"
      v-if="action"
    />
  </div>
</template>

<script>
import { buttonData } from "../constants/data";

export default {
  props: ["error", "group", "action", "colour"],
  data() {
    return {
      buttonData
    };
  }
};
</script>
