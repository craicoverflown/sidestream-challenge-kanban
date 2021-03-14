<template>
  <div class="bg-white w-96 shadow-xl flex flex-col rounded p-2 space-y-2">
    <div class="flex justify-between">
      <h2 class="text-xl font-bold text-black mb-0.5">{{ name }}</h2>
      <slot />
    </div>
    <CardList>
      <ErrorCard
        v-bind:class="
          `bg-${colour}-300 transition duration-500 ease-in-out hover:bg-${colour}-500 rounded p-2`
        "
        v-for="error in data"
        :key="error.index"
        :error="error"
        :action="action"
        :group="name"
      />
    </CardList>
  </div>
</template>

<script>
export default {
  props: ["name", "action", "colour", "data"]
};
</script>
