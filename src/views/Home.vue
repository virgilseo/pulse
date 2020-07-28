<template>
  <div class="home">
    <h1>Amsterdam Events</h1>
    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <section v-else-if="error">
      <p>Something went wrong. Please try again later</p>
    </section>
    <section class="events-container" v-else>
      <label for="sort">Sort: </label>
      <select class="sort-events" name="sort" @change="sortEvents" v-model="sortOption">
        <option value="" disabled >by</option>
        <option value="name.asc">name.asc</option>
        <option value="name.desc">name.desc</option>
        <option value="date.asc">date.asc</option>
        <option value="date.desc">date.desc</option>
      </select>
      <ul>
        <li v-for="eventItem in events" :key="eventItem.id">
          <h3>{{ eventItem.name }}</h3>
          <img
            v-if="eventItem.images"
            img
            :src="eventItem.images[0].url"
            :alt="eventItem.name"
          />
          <p v-if="eventItem.classifications">
            What: {{ eventItem.classifications[0].segment.name }}
          </p>
          <p v-if="eventItem.dates.start">
            When: {{ eventItem.dates.start.localTime }} -
            {{ eventItem.dates.start.localDate }}
          </p>
          <p v-if="eventItem._embedded.venues[0].address">
            Where: {{ eventItem._embedded.venues[0].address.line1 }},
            {{ eventItem._embedded.venues[0].city.name }}
          </p>
          <router-link
            @click.native="saveEvent(eventItem)"
            :to="{
              name: 'details',
              params: { eventId: eventItem.id, event: eventItem }
            }"
            >More details</router-link
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import axios from "axios";

//Create event type interface
type start = {
  localDate: string;
}
type dates = {
  start: start;
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

@Component
export default class Home extends Vue {
  //Set the intial data state
  private events: Array<EventStructure> = [];
  private loading = false;
  private error = false;
  private sortOption = '';

  //Make get request for 10 events in Amsterdam
  //to ticket master api after the component mounts
  mounted() {
    //Display loader while fetching the events data from the api
    this.loading = true;

    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=10&sort=random`
      )
      .then((response: Response) => {
        this.events = response.data._embedded.events;
      })
      .catch((error: Error) => {
        this.error = true;
        console.log(error);
      })
      .finally((): void => {
        this.loading = false;
      });
  }
  //Sort events by date and name (acending and descending)
  private sortEvents() : void {
    switch(this.sortOption) {
      case "name.asc": {
      const byName = this.events.slice(0);
      byName.sort(function(a,b) {
      	const x = a.name.toLowerCase();
	      const y = b.name.toLowerCase();
	      return x < y ? -1 : x > y ? 1 : 0;
      });
      this.events = byName;
      }
      break;
      case "name.desc": {
      const byName = this.events.slice(0);
      byName.sort(function(a,b) {
      	const x = a.name.toLowerCase();
	      const y = b.name.toLowerCase();
	      return x > y ? -1 : x > y ? 1 : 0;
      });
      this.events = byName;
      }
      break;
      case "date.asc": {
        const byDate = this.events.slice(0);
        byDate.sort(function(a,b) {
          const x = Date.parse(a.dates.start.localDate);
          const y = Date.parse(b.dates.start.localDate);
          return x - y;
        });
      this.events = byDate;
      }
      break;
      case "date.desc": {
        const byDate = this.events.slice(0);
        byDate.sort(function(a,b) {
          const x = Date.parse(a.dates.start.localDate);
          const y = Date.parse(b.dates.start.localDate);
          return x > y ? -1 : x > y ? 1 : 0;
        });
      this.events = byDate;
      }
    }
  }
  //Get current categorie selection form the vuex store
  get currentCategorie() {
    return this.$store.state.currentCategorie
  }
  //Save current event in local localStorage
  private saveEvent(eventItem: object): void {
    localStorage.setItem('currentEvent', JSON.stringify(eventItem));
  }
  //Set up watcher for the the computed(the current categorie selected by the user) property
  @Watch('currentCategorie')
  categorieChanged(newVal: string): void {
    this.loading = true;
    //Request events based on the categorie selected by the user(music, art & theatre, etc.)
    axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=10&sort=random&classificationName=${newVal}`
    )
    .then((response: Response) => {
      this.events = response.data._embedded.events;
    })
    .catch((error: Error) => {
      console.log(error);
      this.error = true
    })
    .finally((): void => {
      this.loading = false
    })
  }
}
</script>
