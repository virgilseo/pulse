import axios from "axios";
import { ActionContext } from 'vuex';

type StateEntity = {
  loading: boolean;
  error: boolean;
  event: EventStructure;
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

export const randomizer = {
  namespaced: true,
  state: () => ({
    loading: false,
    error: false,
    event: {},
  }),
  getters: {
    loading(state: StateEntity): boolean {
      return state.loading;
    },
    error(state: StateEntity): boolean {
      return state.error;
    },
    event(state: StateEntity): EventStructure {
      return state.event;
    }
  },
  mutations: {
    onSuccess(state: StateEntity, response: EventStructure) {
      state.event = response;
    },
    onError(state: StateEntity, val: boolean) {
      state.error = val;
    },
    onLoad(state: StateEntity, val: boolean) {
      state.loading = val;
    }
  },
  actions: {
    randomize({ commit }: ActionContext<object, object>) {
      const sortTerms: Array<string> = [
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
      const sortItem: string = sortTerms[(sortTerms.length * Math.random()) | 0];

      const classTerms: Array<string> = [
        "Music",
        "Miscellaneous",
        "Arts & Theatre",
        "Electronic",
        "Hip Hop",
        "Metal",
        "Jazz"
      ];
      const classItem: string = classTerms[(classTerms.length * Math.random()) | 0];

      commit("onError", false);
      commit("onLoad", true);

      axios
        .get(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=1&sort=${sortItem}&classificationName=${classItem}`
        )
        .then((response: Response) => {
          commit("onSuccess", response.data._embedded.events[0]);
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
