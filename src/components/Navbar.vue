<template>
  <nav class="navbar">
    <Avatar title="Narek" />
  </nav>
</template>

<script setup>
import Avatar from "./UI/Avatar.vue";
</script>

<style lang="scss" scoped>
.navbar {
  background-color: hsla(0, 0%, 0%, 0.16);
  border-bottom: solid 1px hsla(0, 0%, 100%, 0.16);
  display: flex;
  justify-content: flex-end;
  max-height: 44px;
  padding: 6px 4px;
}
</style>
