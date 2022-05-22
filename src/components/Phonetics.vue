<template>
  <ul class="phonetics-list">
    <li v-if="text" class="phonetics">
      {{ text }}
      {{ audio && "-" }}
    </li>
    <li v-if="audio" class="phonetics speaker">
      <fa icon="volume-high" @click="handlePronunciation(audio)" />
    </li>
  </ul>
</template>

<script>
export default {
  props: ["phonetics"],

  setup({ phonetics }) {
    let phonetic;

    if (phonetics.length > 0) {
      phonetic = phonetics[1] || phonetics[0];
    } else phonetic = [];

    const { audio, text } = phonetic;

    const handlePronunciation = (url) => {
      let audio = new Audio(url);
      audio.play();
    };

    return { audio, text, handlePronunciation };
  },
};
</script>

<style scoped>
.phonetics-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 1.6rem;
}

.phonetics {
  color: var(--secondary-color);
  font-weight: 500;
}

.speaker {
  cursor: pointer;
  margin-left: 6px;
}

.speaker:active {
  color: rgb(0, 145, 255);
}
</style>
