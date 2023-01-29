import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useBoardStore = defineStore(
  "board",
  () => {
    const columns = ref([
      {
        id: 1,
        title: "To Do",
        cards: [
          {
            id: 1,
            title: "yes",
          },
        ],
      },
      {
        id: 2,
        title: "Doing",
        cards: [],
      },
      {
        id: 3,
        title: "Done",
        cards: [],
      },
    ]);

    const addColumn = (columnTitle) => {
      columns.value.push({
        id: new Date().getUTCMilliseconds(),
        title: columnTitle,
        cards: [],
      });
    };

    const deleteColumn = (columnId) => {
      columns.value = columns.value.filter((column) => column.id !== columnId);
    };

    const addCard = ({ id, title }) => {
      const currentColumn = columns.value.find((column) => column.id === id);
      currentColumn.cards.push({
        id: new Date().getUTCMilliseconds(),
        title,
      });
    };

    return { columns, addColumn, addCard, deleteColumn };
  },
  {
    persist: {
      key: "board-data",
    },
  }
);
