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

// refs
const textarea = ref(null);
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
  textareaIsActive.value === !textareaIsActive.value;
  textarea.value.focus();
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

const log = (evt) => {
  window.console.log(evt);
};
</script>

<template>
  <div class="column">
    <div class="column_header handle">
      <div class="column_header-wrapper" @click="toggleAreaActive">
        <div class="drag-zone" :class="{ disable: textareaIsActive }"></div>
        <h2 class="column_header-name">{{ props.columnData.title }}</h2>
        <textarea
          ref="textarea"
          aria-label="Doing"
          spellcheck="false"
          dir="auto"
          maxlength="512"
          data-autosize="true"
          :value="props.columnData.title"
          @input="$emit('update:modelValue', $event.target.value)"
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
        @change="log"
        itemKey="name"
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
.disable {
  display: none;
}
.ghost {
  position: relative;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: lightgray;
    z-index: 2;
  }
}
.chosenClass {
}
.dragClass {
  transform: rotate(5deg);
  opacity: 1 !important;
  background-color: #fff;
}
.column {
  width: 272px;
  height: 100%;
  white-space: nowrap;
  background-color: #ebecf0;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 15px;
  padding-bottom: 10px;
  &_header {
    position: relative;
    display: flex;
    min-height: 20px;
    padding: 10px 8px;
    align-items: center;
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
    }
    textarea {
      resize: none;
      border-radius: 3px;
      box-shadow: none;
      font-weight: 600px;
      max-height: 256px;
      min-height: 20px;
      height: 28px;
      overflow: hidden;
      overflow-wrap: break-word;
      padding: 4px 8px;
      width: 100%;
      border: none;
      background: transparent;
      &:focus {
        background-color: #fff;
        box-shadow: inset 0 0 0 2px #0079bf;
        outline: none;
      }
    }
    &-extras {
      width: 32px;
      height: 32px;
      border-radius: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 5px;
      &:hover {
        background: #091e4214;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  &_body {
  }
  &_footer {
    width: 100%;
    padding: 0 10px;
    user-select: none;
  }
}
</style>
