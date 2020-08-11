import Vue from "vue";
import Vuex from "vuex";
import {home} from "./home";
import {randomizer} from "./randomizer";
import {related} from "./related";



type relatedModel = {
namespaced: boolean;
state: object;
getters: object;
mutations: object;
actions: object;
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations:{},
  actions: {},
  modules: {
   randomizer,
   home,
   related
  }
});
