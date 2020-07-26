import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/randomizer",
    name: "Randomizer",
    component: () => import("../views/Randomizer.vue")
  },
  {
    path: "/:eventId/details",
    name: "details",
    component: () => import("../views/Details.vue"),
    props: true
  }
];

const router = new VueRouter({
  routes
});

export default router;
