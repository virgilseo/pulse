<template>
  <div @keydown.enter="toggleDropDown" class="categories">
    <div
      @click="toggleDropDown"
      id="categories"
      tabindex="0"
      class="menu-container"
    >
      <span class="categories-label">Categories</span>
      <i v-if="!showCategories" class="material-icons dropdown-icon">
        expand_more
      </i>
      <i v-if="showCategories" class="material-icons dropdown-icon">
        expand_less
      </i>
    </div>
    <div v-if="showCategories" class="categorie-dropdown">
      <ul id="categories-list">
        <li
          tabindex="0"
          class="categorie"
          @click="changeCategorie(categorie)"
          @keydown.enter="changeCategorie(categorie)"
          v-for="categorie in categories"
          :key="categorie.index"
        >
          {{ categorie.name }}
          <i v-if="categorie.isSelected" class="material-icons check-icon"
            >check</i
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

//Add categorie type interface
type Categorie = {
  name: string;
  isSelected: boolean;
};

@Component
export default class Categories extends Vue {
  //Set the initial state
  private categories: Array<Categorie> = [
    { name: "music", isSelected: true },
    { name: "arts & theatre", isSelected: false },
    { name: "miscellaneous", isSelected: false }
  ];

  mounted() {
    //Perssist categorie selection icon when the user navigates
    //back to the home page
    this.categories.forEach(item => {
      item.isSelected = false;

      if (item.name === this.currentCategorie) {
        item.isSelected = true;
      }
    });
  }

  //Toggle categories menu on user input
  private toggleDropDown(): void {
    this.$store.commit("toggleCategories");
    //  this.showCategories ? this.showCategories = false : this.showCategories = true;
  }
  //Change categories on user input
  private changeCategorie(categorie: Categorie): void {
    this.categories.forEach(item => {
      item.isSelected = false;
    });
    categorie.isSelected = true;
    this.$store.commit("home/updateCategorie", categorie.name);
  }
  //Get current categorie selection from the store
  get currentCategorie(): string {
    return this.$store.getters["home/categorie"];
  }
  get showCategories(): boolean {
    return this.$store.getters.showCategories;
  }
}
</script>
