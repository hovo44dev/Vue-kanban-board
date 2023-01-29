<script setup>
import BoardCardModal from "./BoardCardModal.vue";

// props
const props = defineProps({
  cardData: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="card">
    <p class="card_text">{{ props.cardData.title }}</p>
    <div class="card_edit-icon">
      <img src="@/assets/icons/pen.svg" alt="edit" />
    </div>
    <BoardCardModal v-if="false" />
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 0 #091e4240;
  margin: 0 10px;
  padding: 6px 8px;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    background-color: #091e4214;
  }
  &:hover &_edit-icon {
    opacity: 1;
  }
  &_edit-icon {
    width: 32px;
    height: 32px;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    &:hover {
      background-color: #091e4214;
    }
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
