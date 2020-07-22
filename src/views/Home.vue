<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from 'axios'

@Component
export default class Home extends Vue {

  //Set the intial data state
  private events: Array<object> = []

  //Make get request for 10 events in Amsterdam
  //to ticket master api after the component mounts
  mounted() {

    axios.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&city=Amsterdam&page=1&size=10')
     .then((response: object)  => {
       this.events = response.data._embedded.events
       }
     )
     .catch(error => {
       console.log(error)
       }
     )
  }
}
</script>
