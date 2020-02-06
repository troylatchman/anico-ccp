import Vue from "vue";
import VueRouter from "vue-router";
//import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Search from "@/views/Search.vue";
import LifePolicy from "@/views/LifePolicy.vue";
import UAD from "@/views/UAD.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Login,
    props: true
    /*beforeEnter: checkForChanges,*/
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    props: true
  },
  {
    path: "/uad",
    name: "uad",
    component: UAD,
    props: true
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
    props(route) {
      return {
        id: Number(route.params.id)
      };
    },
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
