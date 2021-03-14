<template>
  <div class="flex shadow-md justify-between space-x-4">
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
  props: ["error", "group", "action"],
  data() {
    return {
      buttonData
    };
  }
};
</script>
