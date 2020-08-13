<template>
  <div class="details-page">
    <div class="link-container">
      <router-link class="back-link" to="/">
        <i class="material-icons back-icon">
          arrow_back
        </i>
      </router-link>
        <span class="back-title">Back to events</span>
    </div>
    <div class="event-item event-details">
      <div class="details-header">
        <h1 class="related-header">{{ event.name }}</h1>
        <div class="image-container related-img">
          <img
            class="event-image"
            v-if="event.images"
            :src="filterImages(event.images)"
            :alt="event.name"
          />
        </div>
      </div>
      <p v-if="event.dates.start.dateTime">
        <span class="event-subtitle">Time </span>
        {{ new Date(event.dates.start.dateTime).toLocaleTimeString([], {timeStyle: 'short', minute: "2-digit"}) }}
      </p>
      <p v-if="event.dates.start.localDate">
        <span class="event-subtitle">Date </span>
        {{ new Date(event.dates.start.localDate).toDateString() }}
      </p>
      <section v-if="event._embedded">
        <span class="event-subtitle">Venue </span>
        <slot v-if="event._embedded.venues[0].name"
          >{{ event._embedded.venues[0].name }},
        </slot>
        <slot v-if="event._embedded.venues[0].address"
          >{{ event._embedded.venues[0].address.line1 }}
        </slot>
        <slot v-if="event._embedded.venues[0].city.name">{{
          event._embedded.venues[0].city.name
        }}</slot>
      </section>
      <p v-if="event.priceRanges">
        <span class="event-subtitle">Prices from</span>
        {{ event.priceRanges[0].min }} to {{ event.priceRanges[0].max }}
        {{ event.priceRanges[0].currency }}
      </p>
      <p v-if="event.promoter">
        <span class="event-subtitle">Promoter </span>
        {{event.promoter.name}}
      </p>
      <section v-if="event.sales">
        <p v-if="event.sales.public.startDateTime">
          <span class="event-subtitle">Ticket sales start on </span>
          {{ new Date(event.sales.public.startDateTime).toDateString() }}
        </p>
        <p v-if="event.sales.public.endDateTime">
          <span class="event-subtitle">Ticket sales end on </span>
          {{ new Date(event.sales.public.endDateTime).toDateString() }}
        </p>
      </section>
      <p v-if="event.classifications[0].genre">
        <span class="event-subtitle">Genre </span>
        {{ event.classifications[0].genre.name }}
      </p>
      <p v-if="event.classifications[0].segment">
        <span class="event-subtitle">Type </span>
        {{ event.classifications[0].segment.name }}
      </p>
      <p>
        <a
          class="details-btn"
          v-if="event.url"
          :href="event.url"
          target="_blank"
          >Get tickets</a
        >
      </p>
      <p class="seat-link">
        <a
          class="details-btn"
          v-if="event.seatmap"
          :href="event.seatmap.staticUrl"
          target="_blank"
          >Check out the seat map</a
        >
      </p>
      <p />
    </div>
    <section class="related-events">
      <h3>You might also like...</h3>
      <section v-if="loading">
        <p>Loading...</p>
      </section>
      <section v-else-if="error">
        <p class="error-message">
          <i class="material-icons error-icon">error</i>
          Something went wrong</p>
      </section>
      <ul v-else class="related-list">
        <li
          class="event-item related-event"
          v-for="relatedEvent in relatedEvents"
          :key="relatedEvent.id"
        >
          <div class="image-container">
            <img
              class="event-image"
              v-if="relatedEvent.images"
              :src="filterImages(relatedEvent.images)"
              :alt="relatedEvent.name"
            />
          </div>
          <div class="text-container">
            <h3>{{ relatedEvent.name }}</h3>
            <p v-if="relatedEvent.dates">
              <span class="event-subtitle">When</span>
              {{ new Date(relatedEvent.dates.start.localDate).toDateString() }}
            </p>
            <section v-if="relatedEvent._embedded">
              <span class="event-subtitle">Where </span>
              <slot v-if="relatedEvent._embedded.venues[0].name"
                >{{ relatedEvent._embedded.venues[0].name }},
              </slot>
              <slot v-if="relatedEvent._embedded.venues[0].address"
                >{{ relatedEvent._embedded.venues[0].address.line1 }}
              </slot>
              <slot v-if="relatedEvent._embedded.venues[0].city.name">{{
                relatedEvent._embedded.venues[0].city.name
              }}</slot>
            </section>
            <p v-if="relatedEvent.priceRanges">
              <span class="event-subtitle">Prices from</span>
              {{ relatedEvent.priceRanges[0].min }} to
              {{ relatedEvent.priceRanges[0].max }}
              {{ relatedEvent.priceRanges[0].currency }}
            </p>
          </div>
          <p>
            <a
              class="details-btn"
              v-if="relatedEvent.url"
              :href="relatedEvent.url"
              target="_blank"
              >Get tickets</a
            >
          </p>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

//Create image interface
type Image = {
  fallback: boolean;
  height: number;
  ratio: string;
  url: string;
  width: number;
};

@Component({
  computed: {
    ...mapGetters({
      loading: "related/getLoading",
      error: "related/getError",
      relatedEvents: "related/getItems"
    })
  }
})
export default class Home extends Vue {
  //Set props
  @Prop() private eventId!: string;

  //Get 3 related events form the api after the component mounts
  mounted() {
    //Save venue id to global state
    this.$store.commit("related/saveVenueId", this.event._embedded.venues[0].id);

    this.$store.dispatch("related/getEvents");
  }
  //Perssist event entity after page refresh
  get event() {
    if (this.$attrs.event) {
      return this.$attrs.event;
    } else {
      return JSON.parse(localStorage.getItem("currentEvent") || "");
    }
  }
  //Filter images from the api and get back
  //a image with a height bigger than 200px
  private filterImages(images: Array<Image>): string {
    const filteredImages: Array<Image> = images.filter((image: Image) => image.height > 200);

    return filteredImages[0].url;
  }
}
</script>
