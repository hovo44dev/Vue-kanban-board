import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useBoardStore } from "./board";

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
      boardStore.resetColumns();
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
