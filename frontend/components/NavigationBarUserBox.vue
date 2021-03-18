<template>
  <div
    class="border-2 border-white m-2 p-2 flex space-x-4 items-center shadow-xl rounded-xl"
  >
    <div>
      <div class="text-sm text-white flex justify-end">{{ operator.name }}</div>
      <div class="text-sm text-white flex justify-end">
        {{ operator.surname }}
      </div>
    </div>
    <div v-bind:class="'bg-purple-300 text-white rounded-full'">
      <MaterialIcon
        v-bind:class="'fill-current p-1'"
        :iconType="'genericAvatar'"
        :size="48"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["operator"]
};
</script>
