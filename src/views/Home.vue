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
      <SortEvents :events="this.events" />
      <ul class="event-list">
        <li class="event-item" v-for="eventItem in events" :key="eventItem.id">
          <h3>{{ eventItem.name }}</h3>
          <div
            class="image-container"
          >
            <img
              v-if="eventItem.images"
              img
              :src="filterImages(eventItem.images)"
              :alt="eventItem.name"
              class="event-image"
            />
          </div>
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
import SortEvents from "../components/SortEvents.vue";

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
  components: {
    SortEvents
  },
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
  //Make get request for 10 events in Amsterdam
  //to ticket master api after the component mounts
  mounted() {
    //Dispatch get request for 10 events from the tickemaster api
    this.$store.dispatch("home/getEvents");
  }
  //Save current event and venue id in local localStorage
  private saveEvent(eventItem: object): void {
    localStorage.setItem("currentEvent", JSON.stringify(eventItem));
  }
  //Filter images from the api and get back
  //a image with a height bigger than 200px
  private filterImages(images: object): object {
    const filteredImages = images.filter( image => image.height > 200);

    return filteredImages[0].url;
  }
  //Set up watcher for the the getter(the current categorie selected
  //by the user) and dispatch the api call for new events categorie
  //when the getter changes
  @Watch("categorie")
  categorieChanged(): void {
    this.$store.dispatch("home/getEvents");
  }
}
</script>
