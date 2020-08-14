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
        Something went wrong
      </p>
    </section>
    <section class="event-container" v-else>
      <div class="event-item event-randomize">
        <h3>{{ event.name }}</h3>
        <div class="image-container">
          <img
            class="event-image"
            v-if="event.images"
            img
            :src="filterImages(event.images)"
            :alt="event.name"
          />
        </div>
        <p v-if="event.classifications">
          <span class="event-subtitle">What</span>
          {{ event.classifications[0].segment.name }}
        </p>
        <p v-if="event.dates">
          <span class="event-subtitle">When</span>
          {{ new Date(event.dates.start.localDate).toDateString() }}
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
  //Filter images from the api and get back
  //a image with a height bigger than 200px
  private filterImages(images: Array<Image>): string {
    const filteredImages: Array<Image> = images.filter(
      (image: Image) => image.height > 200
    );

    return filteredImages[0].url;
  }
}
</script>
