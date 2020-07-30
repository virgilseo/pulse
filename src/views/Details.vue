<template>
  <div class="details-page">
    <div class="link-container">
      <router-link class="back-link" to="/">
        <i class="material-icons back-icon">
         arrow_back
       </i>
        Back to events
      </router-link>
    </div>
    <div class="event-item event-details">
      <h1>{{ event.name }}</h1>
      <img v-if="event.images" :src="event.images[0].url" :alt="event.name" />
      <p v-if="event.dates">
        <span class="event-subtitle">When</span> {{ event.dates.start.localTime }}
        {{ event.dates.start.localDate }}
      </p>
      <section v-if="event._embedded">
        <span class="event-subtitle">Where </span>
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
        <span class="event-subtitle">Prices from</span> {{ event.priceRanges[0].min }} to
        {{ event.priceRanges[0].max }} {{ event.priceRanges[0].currency }}
      </p>
      <p><a class="details-btn" v-if="event.url" :href="event.url">Get tickets</a></p>
      <p>
        <a class="details-btn" v-if="event.seatmap" :href="event.seatmap.staticUrl"
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
      <section v-if="error">
        <p>Something went wrong. Please try again later</p>
      </section>
      <ul class="related-list">
        <li class="event-item" v-for="relatedEvent in relatedEvents" :key="relatedEvent.id">
          <h1>{{ relatedEvent.name }}</h1>
          <img
            v-if="relatedEvent.images"
            :src="relatedEvent.images[0].url"
            :alt="relatedEvent.name"
          />
          <p v-if="relatedEvent.dates">
            <span class="event-subtitle">When</span> {{ relatedEvent.dates.start.localTime }} -
            {{ relatedEvent.dates.start.localDate }}
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
            <span class="event-subtitle">Prices from</span> {{ relatedEvent.priceRanges[0].min }} to
            {{ relatedEvent.priceRanges[0].max }}
            {{ relatedEvent.priceRanges[0].currency }}
          </p>
          <p>
            <a class="details-btn" v-if="relatedEvent.url" :href="relatedEvent.url">Get tickets</a>
          </p>
          <p>
            <a
              class="details-btn"
              v-if="relatedEvent.seatmap"
              :href="relatedEvent.seatmap.staticUrl"
              >Check out the seat map</a
            >
          </p>
          <p />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import axios from "axios";

//Crette event type interface
type Venue = {
  id: string;
  name: string;
};
type _Embedded = {
  venues: Array<Venue>;
};
type EventStructure = {
  _embedded: _Embedded;
  _links: object;
  classifications: Array<object>;
  date: object;
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
export default class Home extends Vue {
  //Set props
  @Prop() private eventId!: string;
//  @Prop({ type: Object as () => EventStructure })
  //public eventItem!: EventStructure;
  //Set the innitial state
  private relatedEvents: Array<EventStructure> = [];
  private loading = false;
  private error = false;

  //Get 3 related events form the api after the component mounts
  mounted() {
    //Display loader while fetching the events data from the api
    this.loading = true;
    axios
      .get(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=TROvAEVWbwaLGs6P8wsutq4jzMGkwQky&page=1&size=3&sort=random&venueId=${this.event._embedded.venues[0].id}`
      )
      .then((response: Response) => {
        this.relatedEvents = response.data._embedded.events;
      })
      .catch((error: Error) => {
        this.error = true;
        console.log(error);
      })
      .finally((): void => {
        this.loading = false;
      });
  }
  //Perssist event entity after page refresh
  get event() {
    if(this.$attrs.event) {
      return this.$attrs.event;
    } else {
      return this.$store.state.localEvent;
    }
  }
}
</script>
