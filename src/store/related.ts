import axios from "axios";
import { ActionContext } from "vuex";

type StateEntity = {
  loading: boolean;
  error: boolean;
  events: Array<EventStructure>;
  venueId: string;
};
type EventStructure = {
  _embedded: object;
  _links: object;
  classifications: Array<object>;
  dates: object;
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

export const related = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    events: [],
    venueId: ""
  }),
  getters: {
    getLoading(state: StateEntity): boolean {
      return state.loading;
    },
    getError(state: StateEntity): boolean {
      return state.error;
    },
    getItems(state: StateEntity): Array<EventStructure> {
      return state.events;
    },
    getVenueId(state: StateEntity): string {
      return state.venueId;
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
    saveVenueId(state: StateEntity, val: string) {
      state.venueId = val;
    }
  },
  actions: {
    getEvents({ commit, state }: ActionContext<StateEntity, object>): void {
      commit("onError", false);
      commit("onLoad", true);

      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&page=1&size=3&sort=random&venueId=${state.venueId}`
        )
        .then((response: Response) => {
          commit("onSuccess", response.data._embedded.events);
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
