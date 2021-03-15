<template>
  <div
    class="bg-red-500 h-6 w-6 rounded-full flex absolute items-center justify-center text-xs bottom-0 left-0"
  >
    {{ count }}
  </div>
</template>

<script>
export default {
  props: ["count"]
};
</script>
