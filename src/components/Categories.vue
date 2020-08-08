<template>
  <div class="categories">
    <div class="menu-container">
      <span>Categories</span>
      <i @click="toggleDropDown" class="material-icons">arrow_drop_down</i>
    </div>
    <div v-if="showCategories" class="categorie-dropdown">
      <ul>
        <li>music</li>
        <li>arts & theatre</li>
        <li>miscellaneous</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Randomizer extends Vue {
  //Set the initail state
  private showCategories = false;
  private value = "";

  //Toggle categories menu on user input
  private toggleDropDown(): void {
    this.showCategories ? this.showCategories = false : this.showCategories = true;
  }
}

</script>
