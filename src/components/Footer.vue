<template>
  <div class="footer-container">
    <footer>
      <ul>
        <li
          v-for="route in siteMap.options.routes"
          :key="route.index"
        >
          <router-link
          v-if="route.name !== 'details'"
          :to="route.path"
          >
          {{route.name}}
        </router-link>
        </li>
      </ul>
      <p><slot>©</slot> 2019 Virgil Avram</p>
      <p>Powered by the TicketMaster Api</p>
    </footer>
  </div>
</template>

<script lang="ts">
 import sitemapMiddleware from '../router/';
 import { Component, Vue } from "vue-property-decorator";

 @Component
 export default class Footer extends Vue {
   //Import generated site map
   get siteMap()  {
     return sitemapMiddleware;
   }
 }
</script>
