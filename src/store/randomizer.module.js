import axios from "axios";

export const randomizer = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    event: {}
  }),
  getters: {
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
    event(state) {
      return state.event;
    }
  },
  mutations: {
    onSuccess(state, response) {
      state.event = response;
    },
    onError(state, val) {
      state.error = val;
    },
    onLoad(state, val) {
      state.loading = val;
    }
  },
  actions: {
    randomize({ commit }) {
      const sortTerms = [
        "name,asc",
        "name,desc",
        "date,asc",
        "date,desc",
        "relevance,asc",
        "relevance,desc",
        "name,date,asc",
        "name,date,desc",
        "date,name,asc",
        "date,name,desc",
        "onSaleStartDate,asc",
        "id,asc",
        "venueName,asc",
        "venueName,desc",
        "random"
      ];
      const sortItem = sortTerms[(sortTerms.length * Math.random()) | 0];

      const classTerms = [
        "Music",
        "Miscellaneous",
        "Arts & Theatre",
        "Electronic",
        "Hip Hop",
        "Metal",
        "Jazz"
      ];
      const classItem = classTerms[(classTerms.length * Math.random()) | 0];

      commit("onError", false);
      commit("onLoad", true);

      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=1&sort=${sortItem}&classificationName=${classItem}`
        )
        .then(response => {
          commit("onSuccess", response.data._embedded.events[0]);
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
