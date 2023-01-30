<script setup>
// emits
const emit = defineEmits(["close", "delete"]);

// methods
const closeDropdown = () => {
  emit("close");
};
const deleteCard = () => {
  emit("delete");
  closeDropdown();
};
</script>

<template>
  <div v-click-outside="closeDropdown" class="dropdown">
    <button @click="closeDropdown" class="dropdown_close">
      <img src="@/assets/icons/cross.svg" alt="close" />
    </button>
    <div class="dropdown_header">
      <h4 class="dropdown_header-title">List actions</h4>
    </div>
    <div class="dropdown_actions">
      <div @click="deleteCard" class="dropdown_actions-item">Delete Column</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.dropdown {
  background-color: #fff;
  position: absolute;
  top: -10px;
  left: 80%;
  z-index: 70;
  width: 304px;
  border-radius: $default-border-radius;
  box-shadow: 0 8px 16px -4px $box-shadow-color, 0 0 0 1px $default-hover-color;
  padding: 12px 0;
  @media (max-width: 765px) {
    left: 10px;
  }
  &_close {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    &:hover {
      background-color: $default-hover-color;
    }
    img {
      width: 16px;
      height: 16px;
    }
  }
  &_header {
    height: 40px;
    margin-bottom: 8px;
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid $box-shadow-color;
    margin: 0 12px;
  }
  &_actions {
    margin-top: 10px;
    &-item {
      width: 100%;
      padding: 6px 12px;
      cursor: pointer;
      &:hover {
        background-color: #091e420a;
      }
    }
  }
}
</style>
