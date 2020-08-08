<template>
  <div class="home">
    <h3>Amsterdam Events</h3>
    <section v-if="loading">
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    </section>
    <section  class="error-container" v-else-if="error">
      <p class="error-message">
        <i class="material-icons error-icon">error</i>
        Something went wrong</p>
    </section>
    <section class="events-container" v-else>
      <label class="sort" for="sort">Sort </label>
      <select
        class="sort-events"
        name="sort"
        @change="sortEvents"
        v-model="sortOption"
      >
        <option value="" disabled>by</option>
        <option value="name.asc">name A to Z</option>
        <option value="name.desc">name Z to A</option>
        <option value="date.asc">happening Sooner</option>
        <option value="date.desc">happening Later</option>
      </select>
      <ul class="event-list">
        <li class="event-item" v-for="eventItem in events" :key="eventItem.id">
          <h3>{{ eventItem.name }}</h3>
          <img
            v-if="eventItem.images"
            img
            :src="eventItem.images[0].url"
            :alt="eventItem.name"
          />
          <p v-if="eventItem.classifications">
            <span class="event-subtitle">Categorie</span>
            {{ eventItem.classifications[0].segment.name }}
          </p>
          <p v-if="eventItem.dates.start">
            <span class="event-subtitle">When</span>
            {{ eventItem.dates.start.localTime }}
            {{ eventItem.dates.start.localDate }}
          </p>
          <p v-if="eventItem._embedded.venues[0].address">
            <span class="event-subtitle">Where</span>
            {{ eventItem._embedded.venues[0].address.line1 }},
            {{ eventItem._embedded.venues[0].city.name }}
          </p>
          <router-link
            class="details-btn"
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
import { mapGetters } from "vuex";

//Create event type interface
type start = {
  localDate: string;
};
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

@Component({
  computed: {
    ...mapGetters({
      loading: "home/loading",
      error: "home/error",
      events: "home/events",
      categorie: "home/categorie"
    })
  }
})
export default class Home extends Vue {
  //Set the intial data state
   private sortOption = "";

  //Make get request for 10 events in Amsterdam
  //to ticket master api after the component mounts
  mounted() {
    //Dispatch get request for 10 events from the tickemaster api
    this.$store.dispatch("home/getEvents");
  }
  //Sort events by date and name (acending and descending)
  private sortEvents(): void {
    switch (this.sortOption) {
      case "name.asc":
        {
          const byName = this.events.slice(0);
          byName.sort(function(a, b) {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
          });
          this.$store.commit("home/sortEvents", byName);
        }
        break;
      case "name.desc":
        {
          const byName = this.events.slice(0);
          byName.sort(function(a, b) {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return x > y ? -1 : x > y ? 1 : 0;
          });
          this.$store.commit("home/sortEvents", byName);
        }
        break;
      case "date.asc":
        {
          const byDate = this.events.slice(0);
          byDate.sort(function(a, b) {
            const x = Date.parse(a.dates.start.localDate);
            const y = Date.parse(b.dates.start.localDate);
            return x - y;
          });
          this.$store.commit("home/sortEvents", byDate);
        }
        break;
      case "date.desc": {
        const byDate = this.events.slice(0);
        byDate.sort(function(a, b) {
          const x = Date.parse(a.dates.start.localDate);
          const y = Date.parse(b.dates.start.localDate);
          return x > y ? -1 : x > y ? 1 : 0;
        });
        this.$store.commit("home/sortEvents", byDate);
      }
    }
  }
  //Save current event in local localStorage
  private saveEvent(eventItem: object): void {
    localStorage.setItem("currentEvent", JSON.stringify(eventItem));
  }
  //Set up watcher for the the getter(the current categorie selected
  //by the user) and dispatch the api call for new events categorie
  //when the getter changes
  @Watch("categorie")
  categorieChanged(): void {
    this.$store.dispatch("home/getEvents");
    //Reset sort option
    this.sortOption = "";
  }
}
</script>
