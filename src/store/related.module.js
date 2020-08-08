import axios from "axios";

export const related = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    events: [],
    venueId: ""
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
    venueId(state) {
      return state.venueId;
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
    saveVenueId(state, val) {
      state.venueId = val;
    }
  },
  actions: {
    getEvents({ commit }) {
      commit("onError", false);
      commit("onLoad", true);

      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&page=1&size=3&sort=random&venueId=${this.getters["related/venueId"]}`
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
