<template>
  <div class="randomizer">
    <section v-if="loading">
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    </section>
    <section v-else-if="error">
      <p>Something went wrong. Please try again later</p>
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
import axios from "axios";

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
@Component
export default class Randomizer extends Vue {
  //Set the intial state
  private event: object = {};
  private loading = false;
  private error = false;

  mounted() {
    //Display random event on page load
    this.randomize();
  }
  public randomize(): void {
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

    this.loading = true;

    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=1&sort=${sortItem}&classificationName=${classItem}`
      )
      .then((response: Response) => {
        this.event = response.data._embedded.events[0];
      })
      .catch((error: Error) => {
        this.error = true;
        console.log(error);
      })
      .finally((): void => {
        this.loading = false;
      });
  }
}
</script>
