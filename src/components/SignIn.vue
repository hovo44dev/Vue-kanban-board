<script setup>
import CustomButton from "./UI/CustomButton.vue";
import ModalWrapper from "./UI/ModalWrapper.vue";
import { useAuth } from "@/stores/auth";
import { ref } from "vue";

const store = useAuth();

// reactive data
const userName = ref("");
const authError = ref({
  error: false,
  message: "This field is required",
});

// methods
const signIn = () => {
  if (userName.value) {
    store.signIn(userName.value);
  } else {
    authError.value.error = true;
  }
};
</script>

<template>
  <ModalWrapper>
    <div class="signIn">
      <h2 class="signIn_title">Sign In Trello</h2>
      <div class="signIn_form">
        <input
          v-model="userName"
          class="signIn_form-name"
          type="text"
          placeholder="Your Name"
          @keyup.enter="signIn"
        />
        <span v-if="authError.error" class="error">{{
          authError.message
        }}</span>
        <CustomButton @click="signIn" class="signIn_form-btn"
          >Sign In</CustomButton
        >
      </div>
    </div>
  </ModalWrapper>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
.signIn {
  background-color: #fff;
  border-radius: $default-border-radius;
  padding: 25px 40px;
  box-shadow: rgb(0 0 0 / 10%) 0 0 10px;
  max-width: 400px;
  margin: 100px auto;
  &_title {
    text-align: center;
  }
  &_form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    &-name {
      border: 2px solid #dfe1e6;
      border-radius: $default-border-radius;
      height: 40px;
      padding: 0 4px;
      &:focus {
        outline: none;
        border: 2px solid #4c9aff;
      }
    }
    &-btn {
      margin-top: 10px;
    }
    .error {
      color: red;
      font-size: 0.875rem;
      margin-top: 5px;
    }
  }
}
</style>
