<template>
  <div id="app">
    <Header />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/randomizer">Randomizer</router-link> |
      <div v-if="currentPage === 'Home'" class="categories-container">
        <label for="categories">Categories </label>
        <select class="select" name="categories" @change="changeCategorie" v-model="categorie">
          <option value="" disabled>select</option>
          <option value="music">music</option>
          <option value="Arts & Theatre">arts and theatre</option>
          <option value="Miscellaneous">other</option>
        </select>
      </div>
    </div>
    <router-view />
    <Footer />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

@Component({
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {
  //Set the initial data state
  private categorie = '';
  //Update global state variable with the current categorie selection
  private changeCategorie(): void {
    console.log(this.categorie)
    this.$store.commit("updateCategorie", this.categorie)
  }
  get currentPage(): string {
    return this.$route.name || '';
  }
}
</script>
<style>
@import "./assets/stylesheets/app.css";
</style>
