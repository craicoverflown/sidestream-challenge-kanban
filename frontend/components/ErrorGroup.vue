<template>
  <div class="bg-gray-400 shadow-xl flex flex-col rounded p-2 space-y-2">
    <div class="flex justify-between my-auto">
      <h2 class="text-lg font-bold text-black mb-0.5">{{ name }}</h2>
      <slot />
    </div>
    <CardList>
      <Card
        v-bind:class="
          `bg-${colour}-300 transition duration-500 ease-in-out hover:bg-${colour}-500 rounded p-2`
        "
        v-for="error in data"
        :key="error.index"
        :error="error"
        :action="action"
      />
    </CardList>
  </div>
</template>

<script>
export default {
  props: ["name", "action", "colour", "data"]
};
</script>
