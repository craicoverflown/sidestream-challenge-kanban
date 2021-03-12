<template>
  <div>
    <ModalWindow :onClose="onClose">
      <slot />
    </ModalWindow>
    <ModalBackground />
  </div>
</template>

<script>
export default {
  props: ["onClose"]
};
</script>
