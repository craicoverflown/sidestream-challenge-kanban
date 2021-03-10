<template>
  <div class="flex fixed bottom-0 right-0 m-10">
    <button
<<<<<<< HEAD
      class="bg-green-400 shadow-xl hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
=======
      class="bg-green-400 shadow-xl hover:bg-green-700 hover:shadow-xl transition duration-500 transform hover:-translate-y-2 text-white font-bold py-2 px-4 rounded-full"
>>>>>>> ec34013... SC-14: Hover animation added for cards, card button and FAB
      v-on:click="action"
      v-if="disabled"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  props: ["buttonText", "action", "disabled"]
};
</script>
