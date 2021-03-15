<template>
  <div class="overflow-y-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <TableHeader :columns="columns" />
      <TableBody :data="data" />
    </table>
  </div>
</template>

<script>
export default {
  props: ["data", "columns"]
};
</script>
