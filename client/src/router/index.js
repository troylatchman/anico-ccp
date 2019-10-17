import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Search from "@/views/Search.vue";
import LifePolicy from "@/views/LifePolicy.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/search",
    name: "search",
    component: Search,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.state.cti.onCall) next();
      else next(false);
    }
  },
  {
    path: "/life-policy/:id",
    name: "life-policy",
    component: LifePolicy,
    props: true,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.state.cti.onCall) next();
      else next(false);
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
