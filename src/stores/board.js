import { ref } from "vue";
import { useAuth } from "./auth";
import { defineStore } from "pinia";
import _ from "lodash";
import columnsDefData from "../assets/data/columnsDefData";

export const useBoardStore = defineStore(
  "board",
  () => {
    const authStore = useAuth();

    const columns = ref(columnsDefData);

    const resetColumns = () => {
      localStorage.clear();
      columns.value = _.cloneDeep(columnsDefData);
    };

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
        createdAt: new Date(),
        owner: authStore.userName,
      });
    };

    const editCardTitle = (title, { columnId, cardId }) => {
      const currentColumnIndex = columns.value.findIndex(
        (column) => column.id === columnId
      );
      columns.value[currentColumnIndex].cards.find(
        (card) => card.id === cardId
      ).title = title;
    };

    const deleteCard = ({ columnId, cardId }) => {
      const currentColumnIndex = columns.value.findIndex(
        (column) => column.id === columnId
      );
      columns.value[currentColumnIndex].cards = columns.value[
        currentColumnIndex
      ].cards.filter((card) => card.id !== cardId);
    };

    return {
      columns,
      addColumn,
      addCard,
      deleteColumn,
      deleteCard,
      editCardTitle,
      resetColumns,
    };
  },
  {
    persist: {
      key: "board-data",
    },
  }
);
