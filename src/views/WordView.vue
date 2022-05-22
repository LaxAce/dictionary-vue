<template>
  <div class="word">
    <button class="go-back" @click="handleGoBack">
      <fa icon="arrow-left" class="icon" />
      <span>Search</span>
    </button>

    <div v-if="data" class="word-container">
      <h1>{{ displayWord }}</h1>
      <Phonetics :phonetics="phonetics" />
      <PartOfSpeech
        :meanings="meanings"
        :posIndex="posIndex"
        :handlePartOfSpeech="handlePartOfSpeech"
      />
      <Definitions :activePOS="activePOS" />
      <Example :activePOS="activePOS" />
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { ref } from "@vue/reactivity";
import { computed, onMounted, watch, watchEffect } from "@vue/runtime-core";

// Components
import Phonetics from "../components/Phonetics.vue";
import PartOfSpeech from "../components/PartOfSpeech.vue";
import Definitions from "../components/Definitions.vue";
import Example from "../components/Example.vue";

// Composables
import useFetch from "@/composables/useFetch";

export default {
  props: ["word"],
  components: { Phonetics, PartOfSpeech, Definitions, Example },

  setup({ word }) {
    const posIndex = ref(0);
    const searchedWord = ref("");
    const displayWord = ref("");
    const phonetics = ref("");
    const meanings = ref("");

    const { data, loading, error } = useFetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    watchEffect(() => {
      searchedWord.value = data.value ? data.value[0] : null;
      displayWord.value = searchedWord.value?.word;
      phonetics.value = searchedWord.value?.phonetics;
      meanings.value = searchedWord.value?.meanings;
    });

    const activePOS = computed(() =>
      meanings.value?.find((value, i) => posIndex.value == i)
    );

    const handleGoBack = () => {
      router.push("/");
    };

    const handlePartOfSpeech = (i) => {
      posIndex.value = i;
    };

    return {
      data,
      posIndex,
      searchedWord,
      displayWord,
      phonetics,
      meanings,
      activePOS,
      handleGoBack,
      handlePartOfSpeech,
    };
  },
};
</script>

<style>
.word {
  margin: 5% 5% 30% 5%;
}

.go-back {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: var(--secondary-color);
  background-color: inherit;
  cursor: pointer;
  padding-left: 0;
  margin-left: -10px;
}

.go-back span {
  font-size: 1.4rem;
}

h1 {
  margin-top: 3.6rem;
  margin-bottom: 1rem;
  font-size: 3.2rem;
}

h3 {
  text-transform: uppercase;
  font-size: 1.4rem;
  margin-bottom: 1.4rem;
}

.loading {
  text-align: center;
  margin-top: 4.8rem;
}

.error {
  text-align: center;
  margin-top: 4.8rem;
  font-size: 2.8rem;
}

@media screen and (min-width: 768px) {
  .word {
    width: 60rem;
    margin: 1rem auto;
    margin-bottom: 8rem;
  }
}
</style>
