import { reactive, ref, watch, watchEffect } from "vue";

const useFetch = (url) => {
  const data = ref(null);
  const response = ref(null);
  const error = ref(null);
  const loading = ref(false);

  watchEffect(() => {
    const fetchData = async () => {
      loading.value = true;
      try {
        const res = await fetch(url);
        const json = await res.json();
        data.value = json;
      } catch (err) {
        error.value = err.message;
        console.log(err.message);
      } finally {
        loading.value = false;
      }
    };

    fetchData();
  });

  return { data, error, loading };
};

export default useFetch;
