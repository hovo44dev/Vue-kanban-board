<template>
  <button class="custom_btn">
    <slot />
  </button>
</template>

<script setup></script>

<style lang="scss" scoped>
.custom_btn {
  height: 32px;
  padding: 4px 6px;
  border: none;
  color: #fff;
  background-color: #0079bf;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #026aa7;
  }
}
</style>
