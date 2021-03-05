<template>
  <div class="bg-gray-400 grid grid-cols-1 gap-2 rounded p-2 flex-1">
    <h2 class="text-lg font-bold text-black mb-0.5">{{ name }}</h2>

    <CardList class="overflow-y-scroll">
      <Card
        v-bind:class="'bg-' + colour + '-300 rounded p-2'"
        v-for="error in data"
        :key="error.index"
        :error="error"
      />
    </CardList>
  </div>
</template>

<script>
export default {
  props: ["name", "colour", "data"]
};
</script>
