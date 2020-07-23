<template>
  <div class="home">
    <h1>Amsterdam Events</h1>
    <ul v-if="events.data">
      <li v-for="eventItem in events.data._embedded.events" :key="eventItem.id">
        <h3>{{eventItem.name}}</h3>
        <img :src="eventItem.images[0].url" :alt="eventItem.name">
        <p>What: {{eventItem.classifications[0].segment.name}}</p>
        <p>When: {{eventItem.dates.start.localTime}} - {{eventItem.dates.start.localDate}} </p>
        <p>Where: {{eventItem._embedded.venues[0].address.line1}}, {{eventItem._embedded.venues[0].city.name}}</p>
        <button type="button" name="details">More details</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios"

@Component
export default class Home extends Vue {

  //Set the intial data state
  private events: object = {}

  //Make get request for 10 events in Amsterdam
  //to ticket master api after the component mounts
  mounted() {

    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=10')
     .then((response: object)  => {
       this.events = response
       }
     )
     .catch(error => {
       console.log(error)
       }
     )
  }
}
</script>