<template>
  <div class="footer-container">
    <footer class="footer">
      <div class="nav-container">
        <h3 class="nav-title">Quick navigation</h3>
        <ul>
          <li v-for="route in siteMap.options.routes" :key="route.index">
            <router-link
              class="footer-links"
              v-if="route.name !== 'details'"
              :to="route.path"
            >
              {{ route.name }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="attr-container">
        <p><span class="copy-icon">©</span> 2020 Virgil Avram</p>
        <p>
          Powered by the
          <a
            class="attr-link"
            href="https://developer.ticketmaster.com/products-and-docs/apis/getting-started/"
            >TicketMaster Api</a
          >
        </p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import sitemapMiddleware from "../router/";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {
  //Import generated site map
  get siteMap() {
    return sitemapMiddleware;
  }
}
</script>
