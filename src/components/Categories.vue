<template>
  <div class="categories">
    <div class="menu-container">
      <span>Categories</span>
      <i @click="toggleDropDown" class="material-icons">arrow_drop_down</i>
    </div>
    <div v-if="showCategories" class="categorie-dropdown">
      <ul>
        <li @click="changeCategorie(categorie)" v-for="categorie in categories" :key="categorie.index">
          {{ categorie.name }}
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
  ]

  //Toggle categories menu on user input
  private toggleDropDown(): void {
    this.showCategories ? this.showCategories = false : this.showCategories = true;
  }
  //Change categories on user input
  private changeCategorie(categorie: object): void {
    !categorie.isSelected ? categorie.selected = true : undefined;
    this.$store.commit("home/updateCategorie", categorie.name);
  }
}

</script>
