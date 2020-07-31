import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentCategorie: "",
    localEvent: JSON.parse(localStorage.getItem("currentEvent") || "")
  },
  mutations: {
    updateCategorie(state, newCategorie) {
      state.currentCategorie = newCategorie;
    }
  },
  actions: {},
  modules: {}
});
