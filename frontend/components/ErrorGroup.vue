<template>
  <div
    class="bg-white w-72 xl:w-96 shadow-xl flex flex-col rounded-xl p-2 space-y-2"
  >
    <ErrorGroupHeader :headerTitle="`${name} (${data.length})`">
      <slot />
    </ErrorGroupHeader>
    <CardList>
      <ErrorCard
        v-for="error in data"
        :key="error.index"
        :error="error"
        :action="action"
        :group="name"
        :colour="colour"
      />
    </CardList>
  </div>
</template>

<script>
export default {
  props: ["name", "action", "colour", "data"]
};
</script>
