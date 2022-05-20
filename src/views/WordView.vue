<template>
  <h1>{{ word }}</h1>
</template>

<script>
import router from "@/router";
import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";

// Composables
import useFetch from "@/composables/useFetch";

export default {
  props: ["word"],

  setup({ word }) {
    const posIndex = ref(0);
    console.log(word);

    const { data, loading, error } = useFetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    watchEffect(() => {
      console.log(data);
    });

    const handleGoBack = () => {
      router.push("/");
    };
  },
};
</script>

<style scoped>
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
