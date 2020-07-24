<template>
  <div class="home">
    <h1>Amsterdam Events</h1>
    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <section v-else-if="error">
      <p>Something went wrong. Please try again later</p>
    </section>
    <ul v-else>
      <li v-for="eventItem in events" :key="eventItem.id">
        <h3>{{eventItem.name}}</h3>
        <img v-if="eventItem.images" img :src="eventItem.images[0].url" :alt="eventItem.name">
        <p v-if="eventItem.classifications">What: {{eventItem.classifications[0].segment.name}}</p>
        <p v-if="eventItem.dates.start">When: {{eventItem.dates.start.localTime}} - {{eventItem.dates.start.localDate}} </p>
        <p v-if="eventItem._embedded.venues[0].address">Where: {{eventItem._embedded.venues[0].address.line1}}, {{eventItem._embedded.venues[0].city.name}}</p>
        <router-link :to="{name: 'details', params: {eventId: eventItem.id, eventItem: eventItem }}">More details</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class Home extends Vue {

  //Set the intial data state
  private events: Array<object> = []
  private loading = false
  private error = false

  //Make get request for 10 events in Amsterdam
  //to ticket master api after the component mounts
  mounted() {
    //Display loader while fetching the events data from the api
    this.loading = true

    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=10')
     .then(response  => {
       this.events = response.data._embedded.events
       }
     )
     .catch(error => {
       this.error = true
       console.log(error)
       }
     )
     .finally(() => {
       this.loading = false
     })
  }
}
</script>
