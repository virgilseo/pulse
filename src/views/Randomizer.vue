<template>
  <div class="randomizer">
    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <h3>{{ event.name }}</h3>
    <img v-if="event.images" img :src="event.images[0].url" :alt="event.name" />
    <p v-if="event.classifications">
      What: {{ event.classifications[0].segment.name }}
    </p>
    <p v-if="event.dates">
      When: {{ event.dates.start.localTime }} -
      {{ event.dates.start.localDate }}
    </p>
    <p v-if="event._embedded">
      Where: {{ event._embedded.venues[0].city.name }}
    </p>
    <button @click="randomize" type="button" name="button">Randomize</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Randomizer extends Vue {
  //Set the intial state
  private event: object = {};
  private loading = false;
  private error = false;

  mounted() {
    //Display loader while fetching the event data from the api
    this.loading = true;

    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=1&sort=random`
      )
      .then(response => {
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
    console.log(classItem);
    console.log(sortItem);

    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=1&sort=${sortItem}&classificationName=${classItem}`
      )
      .then(response => {
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
