<script setup>
import Avatar from "./UI/Avatar.vue";
import { useAuth } from "@/stores/auth";
import CustomButton from "./UI/CustomButton.vue";

const store = useAuth();
</script>

<template>
  <nav class="navbar">
    <template v-if="store.isLogin">
      <Avatar class="navbar_avatar" :title="store.userName" />
      <CustomButton @click="store.logout">Logout</CustomButton>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  background-color: hsla(0, 0%, 0%, 0.16);
  border-bottom: solid 1px hsla(0, 0%, 100%, 0.16);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-height: 44px;
  padding: 6px 4px;
  &_avatar {
    margin-right: 5px;
  }
}
</style>
