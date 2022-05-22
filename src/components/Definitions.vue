<template>
  <div v-if="activePOS" class="definition-container">
    <h3 class="definition-heading">Definitions</h3>
    <ol class="definition">
      <li v-for="(value, i) in activePOS.definitions" :key="i">
        {{ value.definition }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  props: ["activePOS"],
};
</script>

<style scoped>
.definition {
  font-size: 1.8rem;
  line-height: 1.5;
  margin-bottom: 3.2rem;
}
</style>
