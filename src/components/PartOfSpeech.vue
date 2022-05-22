<template>
  <ul v-if="meanings" class="part-of-speech-list">
    <li
      v-for="(meaning, i) in meanings"
      :key="i"
      :class="posIndex == i ? 'part-of-speech active' : 'part-of-speech'"
      @click="handlePartOfSpeech(i)"
    >
      {{ meaning.partOfSpeech }}
    </li>
  </ul>
</template>

<script>
export default {
  props: ["meanings", "posIndex", "handlePartOfSpeech"],

  setup({ meanings }) {
    // console.log(meanings);
  },
};
</script>

<style scoped>
.part-of-speech-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 2rem 0;
}

.part-of-speech {
  font-size: 1.6rem;
  padding: 2px 10px;
  color: var(--secondary-color);
  border: 1px solid var(--secondary-color);
  cursor: pointer;
}

.active {
  background-color: var(--secondary-color);
  color: #fff;
}
</style>
