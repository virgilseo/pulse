<template>
  <div class="sort-container">
    <div @click="toggleSort" class="sort-menu">
      <span class="sort-label">Sort by</span>
      <i class="material-icons expand-icon">
        <span v-if="!showSort">expand_more</span>
        <span v-if="showSort">expand_less</span>
      </i>
    </div>
    <div v-if="showSort" class="sort-items">
      <ul>
        <li
          class="sort-item"
          @click="sortEvents(option)"
          v-for="option in sortOptions"
          :key="option.index"
        >
          <span>{{ option.name }}</span>
          <i v-if="option.isSelected" class="material-icons check-icon">check</i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
//Create event type interface
type start = {
  localDate: string;
};
type dates = {
  start: start;
};
type EventStructure = {
  _embedded: object;
  _links: object;
  classifications: Array<object>;
  dates: dates;
  id: string;
  images: Array<object>;
  name: string;
  priceRanges: Array<object>;
  url: string;
};
//Create sort option interface
type Sort = {
  name: string;
  isSelected: boolean;
  type: string;
};

@Component
export default class SortEvents extends Vue {
  @Prop() events!: Array<EventStructure>;
  private showSort = false;
  private sortOptions: Array<Sort> = [
    {name: "name A to Z", isSelected: false, type: "name"},
    {name: "name Z to A", isSelected: false, type: "name"},
    {name: "happening Sooner", isSelected: false, type: "date"},
    {name: "happening Later", isSelected: false, type: "date"}
  ];
  //Toggle sort menu on user input
  private toggleSort() :void {
    this.showSort ? this.showSort = false : this.showSort = true;
  }
  //Sort events by date
  private sortByName(option: Sort): void {
    const byName = this.events.slice(0);
    byName.sort(function(a, b) {
      const x = a.name.toLowerCase();
      const y = b.name.toLowerCase();

      if ( option.name === "name A to Z" ) {
        return x < y ? -1 : x > y ? 1 : 0;
      } else {
        return x > y ? -1 : x > y ? 1 : 0;
      }
    });
    this.$store.commit("home/sortEvents", byName);
  }
  //Sort events by date
  private sortByDate(option: Sort): void {
    const byDate = this.events.slice(0);
    byDate.sort(function(a, b) {
      const x = Date.parse(a.dates.start.localDate);
      const y = Date.parse(b.dates.start.localDate);

      if ( option.name === "happening Sooner") {
        return x - y;
      } else {
        return x > y ? -1 : x > y ? 1 : 0;
      }
    });
    this.$store.commit("home/sortEvents", byDate);
  }
  private sortEvents(option: Sort): void {
    //Display checked icon on sort option after selection
    this.sortOptions.forEach(item => {
      item.isSelected = false;
    });
    option.isSelected = true;

    if (option.type === "name") {
      this.sortByName(option);
    } else {
      this.sortByDate(option);
    }
  }
}
</script>
