<template>
  <div class="random-word">
    <Loading v-if="loading && !error" />
    <div
      v-if="word && !loading && !error"
      class="container"
      @click="handleSearch(word)"
    >
      <h1>Word of the moment</h1>
      <h2>{{ word }}</h2>
      <h3><span>Pronunciation:</span> {{ pronunciation }}</h3>
      <p><span>Definition:</span> {{ definition }}</p>
    </div>
    <Error
      v-if="error && !loading"
      message="Something went wrong. Please
    refresh the page!"
    />
  </div>
</template>

<script>
import { ref, watchEffect } from "@vue/runtime-core";

// Components
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";

// Composables
import useFetch from "../composables/useFetch";

export default {
  props: ["handleSearch"],
  components: { Loading, Error },
  setup() {
    const word = ref("");
    const pronunciation = ref("");
    const definition = ref("");
    const { data, error, loading } = useFetch(
      "https://random-words-api.vercel.app/word"
    );

    watchEffect(() => {
      if (data.value != null) {
        const randomWord = data.value[0];
        word.value = randomWord.word;
        pronunciation.value = randomWord.word;
        definition.value = randomWord.definition;
      }
    });

    return { word, pronunciation, definition, loading, error };
  },
};
</script>

<style scoped>
.random-word {
  margin-top: 3.2rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.container {
  padding: 2rem;
  border-radius: 4px;
  min-width: 80%;
  cursor: pointer;
  -webkit-box-shadow: 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}

.container:hover {
  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}

h1 {
  font-size: 1.6rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2.8rem;
  text-align: center;
}

h2 {
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--secondary-color);
}

span {
  font-size: 1.4rem;
  font-weight: 600;
}

h3 {
  font-size: 1.6rem;
  font-weight: 500;
}

p {
  font-size: 1.8rem;
  margin-top: 8px;
}
</style>
