<template>
  <div class="bg-white w-96 shadow-xl flex flex-col rounded p-2 space-y-2">
    <ErrorGroupHeader :headerTitle="`${name} (${data.length})`">
      <slot />
    </ErrorGroupHeader>
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
