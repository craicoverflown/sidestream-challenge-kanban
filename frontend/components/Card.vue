<template>
  <div>
    <h2 class="text-md font-bold text-black mb-0.5">
      Error Code {{ error.code }}
    </h2>
    <dl class="flex flex-wrap text-sm font-medium whitespace-pre">
      <div class="flex-none w-full mt-0.5 font-normal">
        <dt class="inline font-bold">Message:</dt>
        <dd class="inline text-black">{{ error.text }}</dd>
      </div>
    </dl>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>
