import axios from "axios";
import { ActionContext } from "vuex";

//Create event type interface
type start = {
  localDate: string;
};
type dates = {
  start: start;
};
type StateEntity = {
  loading: boolean;
  error: boolean;
  events: Array<EventStructure>;
  categorie: string;
  page: number;
  changePage: boolean;
};
type EventStructure = {
  _embedded: object;
  _links: object;
  classifications: Array<object>;
  dates: dates;
  id: string;
  images: Array<object>;
  name: string;
  priceRanges: Array<object>;
  url: string;
};
//Create response interface
type Events = {
  events: Array<EventStructure>;
};
type Embedded = {
  _embedded: Events;
};
type Response = {
  data: Embedded;
};

export const home = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    events: [],
    categorie: "music",
    page: 1,
    changePage: true
  }),
  getters: {
    loading(state: StateEntity): boolean {
      return state.loading;
    },
    error(state: StateEntity): boolean {
      return state.error;
    },
    events(state: StateEntity): Array<EventStructure> {
      return state.events;
    },
    categorie(state: StateEntity): string {
      return state.categorie;
    },
    pageNumber(state: StateEntity): number {
      return state.page;
    }
  },
  mutations: {
    onSuccess(state: StateEntity, response: Array<EventStructure>) {
      state.events = response;
    },
    onError(state: StateEntity, val: boolean) {
      state.error = val;
    },
    onLoad(state: StateEntity, val: boolean) {
      state.loading = val;
    },
    sortEvents(state: StateEntity, val: Array<EventStructure>) {
      state.events = val;
    },
    updateCategorie(state: StateEntity, val: string) {
      state.categorie = val;
    },
    incrementPage(state: StateEntity) {
      state.page++;
    },
    decrementPage(state: StateEntity) {
      state.page--;
    },
    signalPageChange(state: StateEntity) {
      !state.changePage ? (state.changePage = true) :
      (state.changePage = false);
    },
    resetPageNumber(state: StateEntity) {
      state.page = 1;
    }
  },
  actions: {
    getEvents({ commit, state }: ActionContext<StateEntity, object>) {
      if (state.events.length && !state.changePage) return;
      commit("onError", false);
      commit("onLoad", true);
      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=${state.page}&size=12&sort=random&classificationName=${state.categorie}`
        )
        .then((response: Response) => {
          commit("onSuccess", response.data._embedded.events);
          commit("signalPageChange");
        })
        .catch((error: Error) => {
          commit("onError", true);
          console.log(error);
        })
        .finally((): void => {
          commit("onLoad", false);
        });
    }
  }
};
