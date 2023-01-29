<script setup></script>

<template>
  <Teleport to="body">
    <div class="modal">
      <slot />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
.modal {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a3;
  z-index: 99;
}
</style>
