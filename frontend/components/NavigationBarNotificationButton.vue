<template>
  <button
    class="transition duration-500 transform hover:-translate-y-2 focus:outline-none text-white font-bold py-4 px-4"
    v-bind:title="NOTIFICATION_TOOLTIP"
    v-on:click="onClick()"
  >
    <MaterialIcon
      v-bind:class="'fill-current text-white'"
      v-bind:iconType="ICON_TYPE.NOTIFICATION"
      v-bind:size="24"
    />
    <NotificationButtonNumber :count="notificationCount" />
  </button>
</template>

<script>
import { NOTIFICATION_TOOLTIP, ICON_TYPE } from "../constants/enums";

export default {
  props: ["onClick", "notificationCount"],
  data() {
    return { NOTIFICATION_TOOLTIP, ICON_TYPE };
  }
};
</script>
