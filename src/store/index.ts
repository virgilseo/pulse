import Vue from "vue";
import Vuex from "vuex";
import {home} from "./home.module";
import {randomizer} from "./randomizer.module";
import {related} from "./related.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations:{},
  actions: {},
  modules: {
   home,
   randomizer,
   related
  }
});
