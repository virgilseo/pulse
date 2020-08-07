import axios from "axios";

export const home = {
  state: () => ({
    loading: false,
    error: false,
    events: [],
    categorie: "music"
  }),
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    events(state) {
      return state.events;
    },
    categorie(state) {
      return state.categorie;
    }
  },
  mutations: {
    onSuccess(state, response) {
      state.events = response;
    },
    onError(state, val) {
      state.error = val;
    },
    onLoad(state, val) {
      state.loading = val;
    },
    sortEvents(state, val) {
      state.events = val;
    },
    updateCategorie(state, val) {
      state.categorie = val;
    }
  },
  actions: {
    getEvents({ commit }) {
      commit("onError", false);
      commit("onLoad", true);
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=10&sort=random&classificationName=${this.getters.categorie}`
        )
        .then(response => {
          commit("onSuccess", response.data._embedded.events);
        })
        .catch(error => {
          commit("onError", true);
          console.log(error);
        })
        .finally(() => {
          commit("onLoad", false);
        });
    }
  }
};
