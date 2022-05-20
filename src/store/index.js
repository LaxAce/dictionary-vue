import { createStore } from "vuex";

export default createStore({
  state: {
    word: "",
  },
  getters: {},
  mutations: {
    UPDATE_WORD(state, payload) {
      state.word = payload;
    },
  },
  actions: {
    updateWord({ commit }, payload) {
      commit("UPDATE_WORD", payload);
    },
  },
  modules: {},
});
