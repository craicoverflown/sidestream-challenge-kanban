<template>
  <div class="flex justify-between space-x-4">
    <CardErrorContent :errorCode="error.code" :errorMessage="error.text" />
    <CardButton
      :index="error.index"
      :buttonName="action.name"
      :buttonMethod="action.handleButtonClick"
      v-if="action"
    />
  </div>
</template>

<script>
export default {
  props: ["error", "action"]
};
</script>
