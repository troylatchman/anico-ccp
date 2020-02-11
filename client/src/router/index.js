import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Search from "@/views/Search.vue";
import LifePolicy from "@/views/LifePolicy.vue";
import UAD from "@/views/UAD.vue";
import store from "@/store";

Vue.use(VueRouter);

const checkLogin = (to, from, next) => {
  if (
    to.name === "login" ||
    (store.state.apiToken && store.state.apiToken.length > 0)
  ) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "root",
    component: Login,
    props: true
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/logout",
    name: "logout",
    component: Login
  },
  {
    path: "/uad",
    name: "uad",
    component: UAD,
    children: [
      {
        path: "home",
        name: "/uad/home",
        component: Home
      },
      {
        path: "about",
        name: "uad/about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      },
      {
        path: "search",
        name: "search",
        component: Search,
        beforeEnter(routeTo, routeFrom, next) {
          if (store.state.cti.onCall) next();
          else next(false);
        }
      }
    ]
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
router.beforeEach(checkLogin);

export default router;
