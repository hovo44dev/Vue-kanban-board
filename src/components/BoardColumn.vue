<script setup>
import { ref } from "vue";
import { useBoardStore } from "@/stores/board";
import BoardCardModal from "./BoardCardModal.vue";
import draggable from "vuedraggable";
import BoardCard from "@/components/BoardCard.vue";
import AddList from "./UI/AddList.vue";
import DropDown from "./UI/DropDown.vue";

const store = useBoardStore();

// props
const props = defineProps({
  columnData: {
    type: Object,
    default: () => {},
  },
});

// emits
const emit = defineEmits(["update:modelValue"]);

// refs
const textarea = ref(null);

// eslint-disable-next-line vue/no-setup-props-destructure
const defaultTitle = props.columnData.title;

// reactive data
const textareaIsActive = ref(false);
const dropdown = ref(false);
const modalData = ref({
  columnId: props.columnData.id,
  cardId: null,
});
const cardModal = ref(false);

// methods
const toggleAreaActive = () => {
  textareaIsActive.value = !textareaIsActive.value;
  textarea.value.focus();
};
const updateColumnTitle = (event) => {
  emit("update:modelValue", event.target.value);
};
const preventEmptyTitle = () => {
  if (props.columnData.title === "") {
    emit("update:modelValue", defaultTitle);
  }
};
const addCard = (title) => {
  const cardData = { id: props.columnData.id, title };

  store.addCard(cardData);
};
const toggleDropdown = (bool) => {
  dropdown.value = bool;
};
const toggleCardModal = () => {
  cardModal.value = !cardModal.value;
};
const addModalData = (cardId) => {
  modalData.value.cardId = cardId;
  toggleCardModal();
};
const editCardTitle = (title, cardId) => {
  store.editCardTitle(title, {
    columnId: props.columnData.id,
    cardId,
  });
};
const deleteCard = (cardId) => {
  store.deleteCard({
    columnId: props.columnData.id,
    cardId,
  });
};
</script>

<template>
  <div class="column">
    <div class="column_header handle">
      <div class="column_header-wrapper" @click="toggleAreaActive">
        <div class="drag-zone" :class="{ disable: textareaIsActive }"></div>
        <textarea
          ref="textarea"
          aria-label="Doing"
          spellcheck="false"
          dir="auto"
          maxlength="512"
          :data-autosize="true"
          :value="props.columnData.title"
          @input="updateColumnTitle"
          @focusout="preventEmptyTitle"
        ></textarea>
      </div>
      <div @click="toggleDropdown(true)" class="column_header-extras">
        <img src="../assets/icons/extras.svg" alt="extras" />
      </div>
    </div>
    <div class="column_cards">
      <draggable
        class="board_columns"
        :list="props.columnData.cards"
        ghostClass="ghost"
        chosenClass="chosenClass"
        dragClass="dragClass"
        group="card"
        handle=".card_drag-handle"
        :force-fallback="true"
      >
        <template #item="{ element }">
          <BoardCard
            @openModal="addModalData(element.id)"
            @edit="(title) => editCardTitle(title, element.id)"
            @delete="deleteCard(element.id)"
            :cardData="element"
          />
        </template>
      </draggable>
    </div>
    <div class="column_footer">
      <AddList text="Add a card" :addCard="true" @add="addCard" />
    </div>
    <DropDown
      v-if="dropdown"
      @close="toggleDropdown(false)"
      @delete="store.deleteColumn(props.columnData.id)"
    />
    <BoardCardModal
      v-if="cardModal"
      @close="toggleCardModal"
      :modalData="modalData"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.column {
  width: 272px;
  height: 100%;
  background-color: #ebecf0;
  border-radius: $default-border-radius;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 6px;
  padding-bottom: 10px;
  &_header {
    position: relative;
    display: flex;
    min-height: 20px;
    padding: 10px 8px;
    justify-content: space-between;
    cursor: pointer;
    &-wrapper {
      width: 100%;
    }
    .drag-zone {
      width: 100%;
      padding-right: 36px;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      z-index: 2;
    }
    &-name {
      display: none;
      font-weight: 600;
      padding: 4px 8px;
      font-size: 1rem;
    }
    textarea {
      resize: none;
      border-radius: $default-border-radius;
      box-shadow: none;
      font-weight: 600;
      max-height: 256px;
      min-height: 20px;
      overflow: hidden;
      overflow-wrap: break-word;
      padding: 4px 8px;
      width: 100%;
      border: none;
      background: transparent;
      &:focus {
        background-color: #fff;
        box-shadow: inset 0 0 0 2px $focus-border;
        outline: none;
      }
    }
    &-extras {
      width: 32px;
      height: 32px;
      border-radius: $default-border-radius;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      &:hover {
        background: $default-hover-color;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  &_footer {
    width: 100%;
    padding: 0 10px;
    user-select: none;
  }
}
</style>
