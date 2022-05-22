<template>
  <div class="home">
    <h1>Dictionary</h1>
    <div class="search-container">
      <input
        type="text"
        name="word"
        placeholder="search here"
        autocomplete="off"
        @keyup="search"
        v-model="input"
      />
      <fa icon="search" class="icon search-icon" @click="handleSearch(input)" />
    </div>
    <Suggestions
      :suggestions="suggestions"
      :handleSuggestionClick="handleSuggestionClick"
    />
    <RandomWord v-if="input == ''" :handleSearch="handleSearch" />
  </div>
</template>

<script>
import { computed, ref, watchEffect, watch } from "@vue/runtime-core";
import router from "@/router";
// import { useStore } from "vuex";

// Components
import Suggestions from "../components/Suggestions.vue";
import RandomWord from "../components/RandomWord.vue";

// Composables
import useFetch from "../composables/useFetch";

export default {
  name: "HomeView",
  components: {},
  components: { Suggestions, RandomWord },
  setup() {
    // const store = useStore();
    // const newWord = computed(() => store.state.word);
    const suggestions = ref(null);
    const input = ref("");

    const search = (e) => {
      const search = ref(e.target.value.trim());

      if (e.key === "Enter" && e.target.value != "") {
        handleSearch(e.target.value);
      }

      const { data, loading } = (search.value = ""
        ? null
        : useFetch(`https://api.datamuse.com/sug?s=${search.value}`));

      watchEffect(() => {
        if (input.value == "" && suggestions.value) suggestions.value = null;
        else if (data.value) suggestions.value = data.value;
      });
    };

    const handleSearch = (input) => {
      if (input != "") {
        // store.dispatch("updateWord", input);
        router.push({ name: "word", params: { word: input } });
      }
    };

    const handleSuggestionClick = (word) => {
      const current = computed(() => {
        return suggestions.value.find((current) => current.word == word);
      });

      if (current) handleSearch(word);
    };

    return {
      suggestions,
      input,
      search,
      handleSuggestionClick,
      handleSearch,
    };
  },
};
</script>

<style scoped>
.home {
  margin: 25% 5% 10% 5%;
}

h1 {
  font-size: 3.2rem;
  font-weight: 800;
}

.search-container {
  background-color: var(--secondary-background);
  padding: 0 8px;
  margin-top: 2.4rem;
  border-bottom: 1px solid #fff;
  border-radius: 4px;
}

input {
  height: 4.6rem;
  background-color: var(--secondary-background);
  padding: 0 8px;
  padding-left: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  font-size: 2rem;
  outline: none;
}

.search-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}

.search-icon {
  fill: #333;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .home {
    width: 60rem;
    margin: 1rem auto;
  }
}
</style>
