<script setup>
import { ref } from "vue";
import CustomButton from "./CustomButton.vue";

// props
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  addCard: {
    type: Boolean,
  },
});
// emits
const emit = defineEmits(["add"]);
// refs
const inputRef = ref(null);
// reactive data
const isEdit = ref(false);
const nameData = ref("");

// methods
const toggleEdit = () => {
  isEdit.value = !isEdit.value;
  if (isEdit.value) inputRef.value.focus();
};

const addList = () => {
  emit("add", nameData.value);
  nameData.value = "";
};
</script>

<template>
  <div
    @click="toggleEdit"
    class="add-list"
    :class="{ 'edit-mode-list': isEdit }"
  >
    <div class="add-list_header">
      <div class="add-list_header_icon">
        <img src="@/assets/icons/plus.svg" alt="plus" />
      </div>
      <p class="add-list_header_text">{{ props.text }}</p>
    </div>

    <div @click.stop class="add-list_form" :class="{ 'p-0': addCard }">
      <textarea
        ref="inputRef"
        class="add-list_form-card-name"
        placeholder="Enter a title for this card..."
        v-model="nameData"
        v-if="addCard"
      ></textarea>
      <input
        v-else
        ref="inputRef"
        class="add-list_form-name"
        type="text"
        placeholder="Enter list title..."
        v-model="nameData"
      />
      <div class="add-list_form-footer">
        <CustomButton @click="addList">Add list</CustomButton>
        <button class="add-list_form-footer-close" @click="toggleEdit">
          <img src="../../assets/icons/cross.svg" alt="close" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-list {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.3s ease;
  &:hover {
    background-color: #091e4214;
  }
  &_header {
    width: 100%;
    display: flex;
    padding: 10px 8px;
    cursor: pointer;
    &_icon {
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  &_form {
    width: 100%;
    background-color: #ebecf0;
    border-radius: 3px;
    height: auto;
    min-height: 32px;
    padding: 4px;
    transition: background 85ms ease-in, opacity 40ms ease-in,
      border-color 85ms ease-in;
    &-name {
      background-color: #fff;
      box-shadow: inset 0 0 0 2px #0079bf;
      display: block;
      margin: 0;
      transition: margin 85ms ease-in, background 85ms ease-in;
      width: 100%;
      border: none;
      padding: 8px 12px;
      border-radius: 3px;
      &:focus {
        outline: none;
      }
    }
    &-card-name {
      width: 100%;
      height: 54px;
      resize: none;
      overflow-wrap: break-word;
      overflow: hidden;
      background-color: #fff;
      border: none;
      max-height: 162px;
      padding: 6px 8px 2px;
      box-shadow: 0 1px 0 #091e4240;
      border-radius: 3px;
      &:focus {
        outline: none;
      }
    }
    &-footer {
      margin-top: 5px;
      display: flex;
      &-close {
        border: none;
        background: transparent;
        width: 32px;
        height: 32px;
        margin-left: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        img {
          width: 24px;
        }
      }
    }
  }
}
.edit-mode-list {
  height: auto;
  .add-list_header {
    display: none;
  }
}
.p-0 {
  padding: 0;
}
</style>
