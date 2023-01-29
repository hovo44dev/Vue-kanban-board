<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="addItem">
    <div class="addItem_icon">
      <img src="@/assets/icons/plus.svg" alt="plus" />
    </div>
    <p class="addItem_text">{{ props.text }}</p>
  </div>
</template>

<style lang="scss" scoped>
.addItem {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px 8px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background-color: #091e4214;
  }
  &_icon {
    margin-right: 10px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
