import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useAuth = defineStore(
  "auth",
  () => {
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
