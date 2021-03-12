<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr class="hover:bg-gray-400" v-for="item in data" :key="item.code">
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">
          {{ item.code }}
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">
          {{ item.occurrence }}
        </div>
      </td>
    </tr>
  </tbody>
</template>
<script>
export default {
  props: ["data"]
};
</script>
