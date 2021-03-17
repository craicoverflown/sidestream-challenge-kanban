<template>
  <div class="flex justify-between">
    <h2 class="text-lg xl:text-xl font-bold text-black mb-0.5">
      {{ headerTitle }}
    </h2>
    <slot />
  </div>
</template>

<script>
export default {
  props: ["headerTitle"]
};
</script>
