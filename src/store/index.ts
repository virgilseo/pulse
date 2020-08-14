import Vue from "vue";
import Vuex from "vuex";
import { home } from "./home";
import { randomizer } from "./randomizer";
import { related } from "./related";

Vue.use(Vuex);

type StateEntity = {
  showCategories: boolean;
  showSort: boolean;
};

export default new Vuex.Store({
  state: () => ({
    showCategories: false,
    showSort: false
  }),
  getters: {
    showCategories(state: StateEntity): boolean {
      return state.showCategories;
    },
    showSort(state: StateEntity): boolean {
      return state.showSort;
    }
  },
  mutations: {
    toggleCategories(state: StateEntity) {
      state.showCategories
        ? (state.showCategories = false)
        : (state.showCategories = true);
    },
    toggleSort(state: StateEntity) {
      state.showSort ? (state.showSort = false) : (state.showSort = true);
    },
    closeDropDowns(state: StateEntity) {
      state.showCategories ? (state.showCategories = false) : null;
    },
    closeSort(state: StateEntity) {
      state.showSort ? (state.showSort = false) : null;
    }
  },
  actions: {},
  modules: {
    randomizer,
    home,
    related
  }
});
