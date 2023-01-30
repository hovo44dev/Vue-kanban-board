<script setup>
import BoardColumn from "./BoardColumn.vue";
import { useBoardStore } from "@/stores/board";
import draggable from "vuedraggable";
import { ref } from "vue";
import AddList from "./UI/AddList.vue";

const store = useBoardStore();
// reactive data
const dragging = ref(false);

// methods
const addColumn = (title) => {
  store.addColumn(title);
};
</script>

<template>
  <div class="board">
    <draggable
      class="board_columns"
      :list="store.columns"
      :group="column"
      ghostClass="ghost"
      chosenClass="chosenClass"
      dragClass="dragClass"
      handle=".handle"
      @start="dragging = true"
      @end="dragging = false"
      :force-fallback="true"
    >
      <template #item="{ element }">
        <BoardColumn :columnData="element" v-model="element.title" />
      </template>
    </draggable>
    <div class="board_add-button">
      <AddList text="Add another list" @add="addColumn" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.board {
  width: 100%;
  background-color: $board-color;
  height: 100%;
  padding: 20px 16px;
  min-height: calc(100vh - 44px);
  display: flex;
  overflow-y: auto;
  &_columns {
    display: flex;
    height: 100%;
  }
  &_add-button {
    min-width: 272px;
    height: 40px;
    background-color: $add-list-bg;
    border-radius: $default-border-radius;
  }
}
</style>
