<template>
  <div>
    <ModalWindow :modalName="modalName" :onClose="onClose">
      <slot />
    </ModalWindow>
    <ModalBackground />
  </div>
</template>

<script>
export default {
  props: ["modalName", "onClose"]
};
</script>
