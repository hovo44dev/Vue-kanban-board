<script setup>
import { computed } from "vue";
import { useBoardStore } from "@/stores/board";
import ModalWrapper from "./UI/ModalWrapper.vue";
import Avatar from "./UI/Avatar.vue";

// store
const store = useBoardStore();

// props
const props = defineProps({
  modalData: {
    type: Object,
    default: () => {},
  },
});

// emits
const emit = defineEmits(["close"]);

// computed
const currentColumnData = computed(() => {
  const currentColumn = store.columns.find(
    (column) => column.id === props.modalData.columnId
  );
  return currentColumn;
});
const getCardData = computed(() => {
  const currentCard = currentColumnData.value.cards.find(
    (card) => card.id === props.modalData.cardId
  );

  return currentCard;
});
const createdAtDate = computed(() => {
  const dateNow = new Date();
  const createdAt = new Date(getCardData.value.createdAt);

  const diffTime = Math.abs(dateNow - createdAt);

  const diffSeconds = Math.floor(diffTime / 1000);
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const units = [
    { name: "days", value: diffDays },
    { name: "hours", value: diffHours % 24 },
    { name: "minutes", value: diffMinutes % 60 },
    { name: "seconds", value: diffSeconds % 60 },
  ];

  const result = [];
  let counter = 0;

  for (let i = 0; i < units.length && counter < 2; i++) {
    if (units[i].value) {
      result.push(units[i].value + " " + units[i].name);
      counter++;
    }
  }

  return result.join(", ");
});

// methods
const closeModal = () => {
  emit("close");
};
const deleteCard = () => {
  store.deleteCard(props.modalData);
  closeModal();
};
</script>

<template>
  <ModalWrapper>
    <div v-click-outside="closeModal" class="card-popup">
      <button @click="closeModal" class="card-popup_close">
        <img src="../assets/icons/cross.svg" alt="close" />
      </button>
      <div class="card-popup-header">
        <div class="card-popup-header-icon">
          <img src="../assets/icons/textbook.svg" alt="book" />
        </div>
        <div class="card-popup-header-body">
          <textarea
            class="card-popup-header-body-title"
            v-model.lazy="getCardData.title"
          />
          <p class="card-popup-header-body-column-name">
            in List <span>{{ currentColumnData.title }}</span>
          </p>
        </div>
      </div>
      <div class="card-popup_body">
        <div class="card-popup_body-wrapper">
          <div class="card-popup-inner">
            <div class="card-popup-inner-description">
              <div class="card-popup-inner-description-icon">
                <img src="../assets/icons/align-left.svg" alt="description" />
              </div>
              <div class="card-popup-inner-description-body">
                <p class="card-popup-inner-description-body-title">
                  Description
                </p>
                <textarea
                  v-model.lazy="getCardData.description"
                  placeholder="Add a more detailed description..."
                  class="card-popup-inner-description-body-area"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="card-popup-activity">
            <div class="card-popup-activity-header">
              <div class="card-popup-activity-header-icon">
                <img src="../assets/icons/activity.svg" alt="align-left" />
              </div>
              <p class="card-popup-activity-header-title">Activity</p>
            </div>
            <div class="card-popup-activity-body">
              <Avatar :title="getCardData.owner" />
              <h3 class="card-popup-activity-body-description">
                {{ getCardData.owner }} <span>an {{ createdAtDate }} ago</span>
              </h3>
            </div>
          </div>
        </div>
        <div class="card-popup-inner-actions">
          <h4 class="card-popup-inner-actions-title">Actions</h4>
          <div class="card-popup-inner-actions-items">
            <div @click="deleteCard" class="item">
              <div class="icon">
                <img src="../assets/icons/trash.svg" alt="delete" />
              </div>
              <p>Delete</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.card-popup {
  width: 768px;
  max-width: 100%;
  margin: 48px auto 80px;
  border-radius: $default-border-radius;
  background-color: #f4f5f7;
  position: relative;
  padding: 16px;
  &_close {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin: 4px;
    padding: 4px;
    transition: background-color 0.3s;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: $default-hover-color;
    }
    img {
      width: 16px;
    }
  }
  &-header {
    display: flex;
    padding-right: 56px;
    &-icon {
      width: 32px;
      height: 32px;
      display: flex;
      img {
        width: 24px;
      }
    }
    &-body {
      width: 100%;
      &-title {
        width: 100%;
        height: 32px;
        overflow-wrap: break-word;
        border: none;
        resize: none;
        overflow: hidden;
        background-color: unset;
        min-height: 24px;
        height: auto;
        padding: 4px 8px;
        font-weight: 600;
        font-size: 1.25rem;
        border-radius: $default-border-radius;
        &:focus {
          outline: none;
          box-shadow: inset 0 0 0 2px $focus-border;
        }
      }
      &-column-name {
        color: #5e6c84;
        font-size: 0.875rem;
        padding-left: 8px;
        span {
          text-decoration: underline;
        }
      }
    }
  }
  &_body {
    display: flex;
    justify-content: space-between;
    @media (max-width: 575px) {
      flex-direction: column;
    }
    &-wrapper {
      flex: 1;
    }
  }
  &-inner {
    margin-top: 30px;
    width: 100%;
    flex: 1;
    &-description {
      display: flex;
      flex: 1;
      margin-top: 20px;
      padding-right: 10px;
      &-icon {
        width: 32px;
        height: 32px;
        display: flex;
        img {
          width: 24px;
          height: 24px;
        }
      }
      &-body {
        width: 100%;
        margin-top: 3px;
        &-title {
          padding-left: 8px;
        }
        &-area {
          width: 100%;
          resize: none;
          min-height: 56px;
          height: auto;
          background-color: #091e420a;
          border-radius: $default-border-radius;
          padding: 8px 12px;
          outline: none;
          border: none;
          margin-top: 20px;
          overflow: hidden;
          &:focus {
            outline: none;
            box-shadow: inset 0 0 0 2px $focus-border;
          }
        }
      }
    }
    &-actions {
      padding: 0 0 8px 8px;
      width: 200px;
      @media (max-width: 575px) {
        margin-top: 30px;
      }
      &-items {
        margin-top: 10px;
      }
      .item {
        width: 100%;
        height: 32px;
        display: flex;
        align-items: center;
        border-radius: $default-border-radius;
        padding: 6px 12px;
        background-color: #091e420a;
        transition: background-color 0.3s;
        cursor: pointer;
        &:hover {
          background-color: $default-hover-color;
        }
        .icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px;
          img {
            width: 16px;
            height: 16px;
          }
        }
      }
    }
  }
  &-activity {
    margin-top: 40px;
    &-header {
      display: flex;
      align-items: center;
      &-icon {
        width: 32px;
        height: 32px;
        display: flex;
        img {
          width: 24px;
        }
      }
      &-title {
        padding-left: 8px;
      }
    }
    &-body {
      margin-top: 15px;
      display: flex;
      align-items: center;
      &-description {
        margin-left: 10px;
        font-weight: 600;
        span {
          font-size: 0.875rem;
        }
      }
    }
  }
}
</style>
