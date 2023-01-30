<script setup>
import Board from "../components/Board.vue";
import SignIn from "../components/SignIn.vue";
import { useAuth } from "@/stores/auth";

const store = useAuth();
</script>

<template>
  <div class="home">
    <Board />
    <SignIn v-if="!store.isLogin" />
  </div>
</template>

<style lang="scss" scoped></style>
