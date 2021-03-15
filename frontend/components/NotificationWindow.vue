<template>
  <CardList>
    <NotificationCard
      v-for="item in data"
      :key="item.index"
      :iconType="item.iconType"
      :text="item.text"
      :time="item.time"
    />
  </CardList>
</template>

<script>
export default {
  props: ["data"]
};
</script>
