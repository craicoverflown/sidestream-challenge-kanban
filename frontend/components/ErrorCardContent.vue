<template>
  <div class="w-64">
    <h2 class="text-sm xl:text-md font-bold text-black mb-0.5">
      Error Code {{ errorCode }}
    </h2>
    <dl class="text-xs xl:text-sm font-medium">
      <div class="mt-0.5 font-normal">
        <dt class="inline font-bold">Message:</dt>
        <dd class="inline text-black">{{ errorMessage }}</dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: ["errorCode", "errorMessage"]
};
</script>
