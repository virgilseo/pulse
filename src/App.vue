<template>
  <div
    @click="
      [
        showCategories ? closeDropDown($event) : null,
        showSort ? closeSort($event) : null
      ]
    "
    id="app"
  >
    <Header />
    <div id="nav">
      <div class="inner-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/randomizer">Randomizer</router-link>
        <div v-if="currentPage === 'Home'" class="categories-container">
          <Categories />
        </div>
      </div>
    </div>
    <router-view />
    <ScrollButton :scrollTop="scrollTop" v-if="scroll" />
    <Footer />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ScrollButton from "./components/ScrollButton.vue";
import Categories from "./components/Categories.vue";
import { mapGetters } from "vuex";

@Component({
  components: {
    Header,
    Footer,
    ScrollButton,
    Categories
  },
  computed: {
    ...mapGetters({
      showCategories: "showCategories",
      showSort: "showSort"
    })
  }
})
export default class App extends Vue {
  //Set the initial data state
  private scroll = false;

  get currentPage(): string {
    return this.$route.name || "";
  }
  //Set up event listener for scroll position
  created() {
    window.addEventListener("scroll", this.showButon);
  }
  destroyed() {
    window.removeEventListener("scroll", this.showButon);
  }
  private showButon(): void {
    window.scrollY > 600 ? (this.scroll = true) : (this.scroll = false);
  }
  private scrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  //Close categories dropdown on page click
  private closeDropDown(e: any): void {
    if (
      e.target.parentNode.id !== "categories" &&
      e.target.parentNode.parentNode.id !== "categories" &&
      e.target.parentNode.parentNode.parentNode.id !== "categories"
    ) {
      this.$store.commit("closeDropDowns");
    }
  }
  //Close sort dropdown on page click
  private closeSort(e: any): void {
    if (
      e.target.parentNode.id !== "sort" &&
      e.target.parentNode.parentNode.id !== "sort" &&
      e.target.parentNode.parentNode.parentNode.id !== "sort"
    ) {
      this.$store.commit("closeSort");
    }
  }
}
</script>
<style>
@import "./assets/stylesheets/app.css";
@import "./assets/stylesheets/responsive.css";
</style>
