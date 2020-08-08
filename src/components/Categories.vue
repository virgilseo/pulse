<template>
  <div class="categories-container">
    <div class="menu-container">
      <span class="categories-label">Categories</span>
      <i @click="toggleDropDown" class="material-icons dropdown-icon">
        <span v-if="!showCategories">expand_more</span>
        <span v-if="showCategories">expand_less</span>
      </i>
    </div>
    <div v-if="showCategories" class="categorie-dropdown">
      <ul>
        <li class="categorie" @click="changeCategorie(categorie)" v-for="categorie in categories" :key="categorie.index">
          {{ categorie.name }}
          <i v-if="categorie.isSelected" class="material-icons check-icon">check</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Categories extends Vue {
  //Set the initail state
  private showCategories = false;
  private categories: Array<object> = [
    { name: "music", isSelected: true },
    { name: "arts & theatre", isSelected: false },
    { name: "miscellaneous", isSelected: false },
  ];

  mounted() {
    //Perssist categorie selection icon when the user navigates
    //back to the home page
    this.categories.forEach(item => {
      item.isSelected = false;

      if(item.name === this.currentCategorie) {
        item.isSelected = true;
      }
    });
  }

  //Toggle categories menu on user input
  private toggleDropDown(): void {
    this.showCategories ? this.showCategories = false : this.showCategories = true;
  }
  //Change categories on user input
  private changeCategorie(categorie: object): void {
    this.categories.forEach(item => {
      item.isSelected = false
    });
    categorie.isSelected = true;
    this.$store.commit("home/updateCategorie", categorie.name);
  }
  //Get current categorie selection from the store
  get currentCategorie(): string {
    return this.$store.getters["home/categorie"];
  }
}

</script>
