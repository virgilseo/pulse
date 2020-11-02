<template>
  <div class="home">
    <div class="events-header">
      <h3>
        Amsterdam <span class="categorie-title">{{ categorie }}</span> Events
      </h3>
      <div class="page-nav-container">
        <i
          v-if="pageNumber >= 2"
          class="material-icons page-back"
          @click="previousPage"
        >
          keyboard_arrow_left
        </i>
        <span class="page-number">{{ pageNumber }}</span>
        <i
          v-if="events.length === 12"
          class="material-icons page-next"
          @click="nextPage"
        >
          keyboard_arrow_right
        </i>
      </div>
    </div>
    <section v-if="loading">
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    </section>
    <section class="error-container" v-else-if="error">
      <p class="error-message">
        <i class="material-icons error-icon">error</i>
        Something went wrong
      </p>
    </section>
    <section class="events-container" v-else>
      <SortEvents :events="this.events" />
      <ul class="event-list">
        <li
          class="event-item event-home"
          v-for="eventItem in events"
          :key="eventItem.id"
        >
          <div class="event">
            <div class="image-container homeImage-container">
              <img
                v-if="eventItem.images"
                img
                :src="filterImages(eventItem.images)"
                :alt="eventItem.name"
                class="event-image"
              />
            </div>
            <h3>{{ eventItem.name }}</h3>
            <p v-if="eventItem.classifications">
              <span class="event-subtitle">Categorie</span>
              {{ eventItem.classifications[0].segment.name }}
            </p>
            <p v-if="eventItem.dates.start">
              <span class="event-subtitle">When</span>
              {{ new Date(eventItem.dates.start.localDate).toDateString() }}
            </p>
            <p v-if="eventItem._embedded.venues[0].address">
              <span class="event-subtitle">Where</span>
              {{ eventItem._embedded.venues[0].address.line1 }},
              {{ eventItem._embedded.venues[0].city.name }}
            </p>
          </div>
          <div class="btn-container">
            <router-link
              class="details-btn"
              @click.native="saveEvent(eventItem)"
              :to="{
                name: 'details',
                params: { eventId: eventItem.id, event: eventItem }
              }"
              >More details</router-link
            >
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapGetters } from "vuex";
import SortEvents from "../components/SortEvents.vue";

//Create image interface
type Image = {
  fallback: boolean;
  height: number;
  ratio: string;
  url: string;
  width: number;
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
      categorie: "home/categorie",
      pageNumber: "home/pageNumber"
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
  //Save current event in local localStorage
  private saveEvent(eventItem: object): void {
    localStorage.setItem("currentEvent", JSON.stringify(eventItem));
  }
  //Filter images from the api and get back
  //a image with a height bigger than 200px
  private filterImages(images: Array<Image>): string {
    const filteredImages: Array<Image> = images.filter(
      (image: Image) => image.height > 200
    );

    return filteredImages[0].url;
  }
  //Display next 10 events when the user clicks the next button
  private nextPage(): void {
    this.$store.commit("home/incrementPage");
    this.$store.commit("home/signalPageChange");
    this.$store.dispatch("home/getEvents");
  }
  //Go back the previous events on user input
  private previousPage(): void {
    this.$store.commit("home/decrementPage");
    this.$store.commit("home/signalPageChange");
    this.$store.dispatch("home/getEvents");
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
