<template>
  <div class="example-container">
    <h3 class="example-heading">Examples</h3>
    <ul class="example">
      <li v-for="(value, i) in activePOS.definitions" :key="i">
        {{ value.example }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["activePOS"],
};
</script>

<style scoped>
.example {
  font-size: 1.8rem;
  line-height: 1.5;
  margin-bottom: 3.2rem;
  margin-left: 1.2rem;
}
</style>
