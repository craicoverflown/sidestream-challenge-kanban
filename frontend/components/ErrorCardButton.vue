<template>
  <div class="flex items-center">
    <button
      v-bind:class="
        `shadow-xl bg-white text-${buttonData.colour}-600 transition duration-500 ease-in-out hover:bg-${buttonData.colour}-600 hover:text-white border-2 border-${buttonData.colour}-600 hover:border-white focus:outline-none rounded-lg px-2`
      "
      v-bind:title="buttonData.tooltip"
      v-on:click="buttonMethod(index)"
    >
      <MaterialIcon
        v-bind:class="`fill-current p-1`"
        :iconType="buttonData.icon"
        :size="30"
      />
    </button>
  </div>
</template>

<script>
export default {
  props: ["index", "buttonMethod", "buttonData"]
};
</script>
