<template>
  <p class="error">{{ message }}</p>
</template>

<script>
export default {
  props: ["message"],
};
</script>

<style scoped>
.error {
  font-size: 1.4rem;
  color: tomato;
  font-weight: 600;
}
</style>
