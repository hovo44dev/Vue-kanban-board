<script setup>
import { computed } from "vue";
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
});

const shortTitle = computed(() => {
  return props?.title?.slice(0, 1);
});
</script>

<template>
  <div class="avatar">
    {{ shortTitle }}
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 24px;
  height: 24px;
  background-color: #00875a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
