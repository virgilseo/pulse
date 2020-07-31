<template>
  <div @click="scrollTop" class="scroll-container">
      <i class="material-icons scroll-icon">arrow_upward</i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ScrollButton extends Vue {
@Prop() private scrollTop!: void;
}

</script>
