<script setup>
import { ref, watch, computed } from "vue";
import CustomButton from "./UI/CustomButton.vue";

// props
const props = defineProps({
  cardData: {
    type: Object,
    default: () => {},
  },
});

// emits
const emit = defineEmits(["openModal", "edit", "delete"]);

// refs
const editZone = ref(null);
const ActionsPosition = ref(0);

// reactive data
const editMode = ref(false);
const cardTitle = ref(props.cardData.title);

// computed
const actionsPositionIlLeft = computed(() => {
  return ActionsPosition.value >= 800;
});

// watch
watch(editZone, () => {
  if (editZone.value) {
    ActionsPosition.value = editZone.value?.getBoundingClientRect().right;
  }
});

// methods
const toggleEditMode = () => {
  editMode.value = !editMode.value;
};
const editCardTitle = () => {
  emit("edit", cardTitle.value);
  toggleEditMode();
};
const deleteCard = () => {
  emit("delete");
  toggleEditMode();
};
</script>

<template>
  <div class="card">
    <div class="card_drag-handle">
      <div @click="emit('openModal')" class="wrapper">
        <p class="card_text">{{ props.cardData.title }}</p>
        <div v-if="props.cardData.description" class="card_description-icon">
          <img src="../assets/icons/align-left.svg" alt="description" />
        </div>
      </div>
      <div @click.stop="toggleEditMode" class="card_edit-icon">
        <img src="@/assets/icons/pen.svg" alt="edit" />
      </div>
    </div>
    <template v-if="editMode">
      <div @click="toggleEditMode" class="card_editWrapper"></div>
      <div class="card_edit" ref="editZone">
        <div>
          <textarea class="card_edit-textarea" v-model="cardTitle"></textarea>
          <div v-if="props.cardData.description" class="card_description-icon">
            <img src="../assets/icons/align-left.svg" alt="description" />
          </div>
        </div>
        <div class="card_edit-btn">
          <CustomButton @click="editCardTitle"> Save </CustomButton>
        </div>
        <div
          class="card_edit-actions"
          :class="{ 'is-left': actionsPositionIlLeft }"
        >
          <div @click="deleteCard" class="card_edit-actions-item">
            <img src="../assets/icons/trash-white.svg" alt="delete" />
            <span>delete</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.card {
  background-color: #fff;
  border-radius: $default-border-radius;
  box-shadow: 0 1px 0 $box-shadow-color;
  margin: 0 10px;
  padding: 6px 8px;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  cursor: pointer;
  transition: opacity 0.3s;
  &:hover {
    background-color: $default-hover-color;
  }
  &:hover &_edit-icon {
    opacity: 1;
  }
  &_drag-handle {
    display: flex;
    justify-content: space-between;
  }
  .wrapper {
    width: 100%;
  }
  &_text {
    margin-top: 5px;
  }
  &_description-icon {
    margin-top: 5px;
    img {
      width: 16px;
    }
  }
  &_edit-icon {
    width: 32px;
    height: 32px;
    border-radius: $default-border-radius;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    &:hover {
      background-color: $default-hover-color;
    }
    cursor: pointer;
    img {
      width: 20px;
      height: 20px;
    }
  }
  &_editWrapper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #0009;
    z-index: 10;
    cursor: default;
  }
  &_edit {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    padding: 6px 8px 2px;
    background-color: #fff;
    border-radius: $default-border-radius;
    z-index: 10;
    &-textarea {
      width: 100%;
      overflow: hidden;
      overflow-wrap: break-word;
      resize: none;
      height: 90px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    &-btn {
      position: absolute;
      bottom: -40px;
      left: 0;
      button {
        width: 75px;
      }
    }
    &-actions {
      position: absolute;
      right: -100px;
      top: 0;
      @media (max-width: 420px) {
        bottom: -40px;
        top: unset;
        right: 0;
      }
      &-item {
        background-color: #0009;
        border-radius: $default-border-radius;
        color: #c7d1db;
        padding: 6px 12px;
        transition: transform 85ms ease-in;
        &:hover {
          background: #000c;
          color: #fff;
          transform: translateX(5px);
        }
        img {
          width: 16px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
    }
    .is-left {
      left: -100px;
      right: unset;
    }
  }
}
</style>
