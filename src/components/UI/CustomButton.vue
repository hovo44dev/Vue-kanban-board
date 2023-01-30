<template>
  <button class="custom_btn">
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.custom_btn {
  height: 32px;
  padding: 4px 6px;
  border: none;
  color: #fff;
  background-color: $focus-border;
  border-radius: $default-border-radius;
  cursor: pointer;
  &:hover {
    background-color: #026aa7;
  }
}
</style>
