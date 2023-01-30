import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useBoardStore } from "./board";
import columnsDefData from "../assets/data/columnsDefData";

export const useAuth = defineStore(
  "auth",
  () => {
    const boardStore = useBoardStore();

    // reactive data
    const userName = ref("");

    // computed
    const isLogin = computed(() => {
      return !!userName.value;
    });

    // methods
    const signIn = (name) => {
      userName.value = name;
    };

    const logout = () => {
      boardStore.columns = columnsDefData;
      userName.value = null;
    };

    return { userName, isLogin, signIn, logout };
  },
  {
    persist: {
      key: "auth",
    },
  }
);
