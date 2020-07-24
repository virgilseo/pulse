<template>
  <div class="details-page">
    <router-link to="/">Back to events</router-link>
    <h1>{{event.name}}</h1>
    <img v-if="event.images" :src="event.images[0].url" :alt="event.name">
    <p v-if="event.dates">When: {{event.dates.start.localTime}} -
       {{event.dates.start.localDate}}
    </p>
    <section v-if="event._embedded">
      Where:
      <span v-if="event._embedded.venues[0]">{{event._embedded.venues[0].name}}</span>,
      <span v-if="event._embedded.venues[0].address">{{event._embedded.venues[0].address.line1}} - </span>
      <span v-if="event._embedded.venues[0].city.name">{{event._embedded.venues[0].city.name}}</span>
    </section>
    <p v-if="event.priceRanges">
      Prices from {{event.priceRanges[0].min}} to
      {{event.priceRanges[0].max}} {{event.priceRanges[0].currency}}
    </p>
    <p><a v-if="event.url" :href="event.url">Get tickets</a></p>
    <p><a v-if="event.seatmap" :href="event.seatmap.staticUrl">Check out the seat map</a><p/>
    <section>
      <h3>You might also like: </h3>
      <ul>
        <li>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from 'axios'

@Component
export default class Home extends Vue {
  @Prop() private eventId!: string;
  private event: object = {}

  mounted() {
    axios.get(`https://app.ticketmaster.com/discovery/v2/events/${this.eventId}.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&ev`)
      .then(response => {
        this.event = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}

</script>
