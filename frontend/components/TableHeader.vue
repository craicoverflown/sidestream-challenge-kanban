<template>
  <thead class="bg-gray-50">
    <tr>
      <th
        scope="col"
        class="bg-white sticky top-0 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
        v-for="name in columns"
        :key="name"
      >
        {{ name }}
      </th>
    </tr>
  </thead>
</template>
<script>
export default {
  props: ["columns"]
};
</script>
