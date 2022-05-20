<template>
  <ul v-if="suggestions" class="suggestion-list">
    <li
      v-for="(suggestion, index) in suggestions"
      :key="index"
      @click="handleSuggestionClick(suggestion.word)"
    >
      {{ suggestion.word }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["suggestions", "handleSuggestionClick"],
};
</script>

<style scoped>
.suggestion-list {
  background-color: var(--secondary-background);
}

li {
  padding: 8px 8px;
  font-size: 2rem;
  border-bottom: 1px solid #fff;
  cursor: pointer;
}
</style>
