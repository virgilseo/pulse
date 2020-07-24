<template>
  <div class="details-page">
    <router-link to="/">Back to events</router-link>
    <h1>Event Details</h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop() private eventId!: string;
}

</script>
