<template>
  <div id="app">
    <Header />
    <div id="nav">
      <div class="inner-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/randomizer">Randomizer</router-link>
        <div v-if="currentPage === 'Home'" class="categories-container">
          <label class="categories-label" for="categories">Categories </label>
          <select class="select" name="categories" @change="changeCategorie" v-model="categorie">
            <option value="" disabled>select</option>
            <option value="music">music</option>
            <option value="Arts & Theatre">arts and theatre</option>
            <option value="Miscellaneous">other</option>
          </select>
        </div>
      </div>
    </div>
    <router-view />
    <ScrollButton v-if="scroll" />
    <Footer />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import ScrollButton from './components/ScrollButton.vue';

@Component({
  components: {
    Header,
    Footer,
    ScrollButton
  }
})
export default class App extends Vue {
  //Set the initial data state
  private categorie = '';
  private scroll = false;
  //Update global state variable with the current categorie selection
  private changeCategorie(): void {
    this.$store.commit("updateCategorie", this.categorie)
  }
  get currentPage(): string {
    return this.$route.name || '';
  }
  //Set up event listener for scroll position
  created() {
    window.addEventListener('scroll', this.showButon);
  }
  destroyed() {
    window.removeEventListener('scroll', this.showButon);
  }
  private showButon(): void {
    window.scrollY > 600 ? this.scroll = true : this.scroll = false;
  }
}
</script>
<style>
@import "./assets/stylesheets/app.css";
@import "./assets/stylesheets/responsive.css";
</style>
