<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/randomizer">Randomizer</router-link> |
      <label for="categories">Categories </label>
      <select class="select" name="categories" @change="changeCategorie" v-model="categorie">
        <option value="" disabled>select</option>
        <option value="music">music</option>
        <option value="Arts & Theatre">arts and theatre</option>
        <option value="Miscellaneous">miscellaneous</option>
        <option value="Sports">sports</option>
      </select>
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  //Set the initial data state
  private categorie = '';

  private changeCategorie(): void {
    console.log(this.categorie)
  }
}
</script>
<style>
@import "./assets/stylesheets/app.css";
</style>
