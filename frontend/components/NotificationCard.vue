<template>
  <div
    class="flex bg-purple-200 hover:bg-purple-400 shadow-md transition duration-500 ease-in-out rounded space-x-4 p-2"
  >
    <NotificationCardIcon :iconType="iconType" />
    <NotificationCardContent :text="text" :time="time" />
  </div>
</template>

<script>
export default {
  props: ["iconType", "text", "time"]
};
</script>
