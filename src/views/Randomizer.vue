<template>
  <div class="randomizer">
    <section v-if="loading">
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    </section>
    <section class="error-container" v-else-if="error">
      <p class="error-message">
        <i class="material-icons error-icon">error</i>
        Something went wrong</p>
    </section>
    <section class="event-container" v-else>
      <div class="event-item event-randomize">
        <h3>{{ event.name }}</h3>
        <img
          v-if="event.images"
          img
          :src="event.images[0].url"
          :alt="event.name"
        />
        <p v-if="event.classifications">
          <span class="event-subtitle">What</span>
          {{ event.classifications[0].segment.name }}
        </p>
        <p v-if="event.dates">
          <span class="event-subtitle">When</span>
          {{ event.dates.start.localTime }} -
          {{ event.dates.start.localDate }}
        </p>
        <p v-if="event._embedded">
          <span class="event-subtitle">Where</span>
          {{ event._embedded.venues[0].city.name }}
        </p>
        <button
          class="randomize-btn"
          @click="randomize"
          type="button"
          name="button"
        >
          Randomize
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

//Create event interface
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
@Component({
  computed: {
    ...mapGetters({
      loading: "randomizer/loading",
      error: "randomizer/error",
      event: "randomizer/event"
    })
  }
})
export default class Randomizer extends Vue {

  mounted() {
    //Display random event on page load
    this.$store.dispatch("randomizer/randomize");
  }
  public randomize(): void {
     //Display random event on user input
    this.$store.dispatch("randomizer/randomize");
  }
}
</script>
