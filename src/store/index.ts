import Vue from "vue";
import Vuex from "vuex";
import {home} from "./home";
import {randomizer} from "./randomizer";
import {related} from "./related";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    showCategories: false,
    showSort: false
  }),
  getters: {
    showCategories(state) {
      return state.showCategories;
    },
    showSort(state) {
      return state.showSort;
    }

  },
  mutations: {
    toggleCategories(state) {
      state.showCategories ? state.showCategories = false : state.showCategories = true;
    },
    toggleSort(state) {
      state.showSort ? state.showSort = false: state.showSort = true;
    },
    closeDropDowns(state) {
      state.showCategories ? state.showCategories = false : null;
    },
    closeSort(state) {
      state.showSort ? state.showSort = false : null;
    }
  },
  actions: {},
  modules: {
   randomizer,
   home,
   related
  }
});
