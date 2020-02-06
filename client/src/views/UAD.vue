<template>
  <v-app id="ccp-app">
    <AppBar />
    <NavigationDrawer />
    <v-content>
      <v-container fluid>
        <!-- There is an issue in vue-loader when using keep-alive  -->
        <!-- For more details: https://github.com/vuejs/vue-loader/issues/1332 -->
        <!-- Disabling keep-alive (destory inactive components) will ensure HMR works, which can speed up development -->
        <!-- Ensure that keep-alive is enabled for builds being promoted to any environment-->
        <template v-if="keepAlive">
          <keep-alive :max="50">
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </template>
        <template v-else>
          <router-view :key="$route.fullPath"></router-view>
        </template>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
import NavigationDrawer from "@/components/NavigationDrawer";

export default {
  components: {
    AppBar,
    NavigationDrawer
  },
  data() {
    return {
      inactiveComponentLifeCycle:
        process.env.VUE_APP_INACTIVE_ROUTER_VIEW_LIFE_CYCLE
    };
  },
  computed: {
    keepAlive() {
      return this.inactiveComponentLifeCycle !== "destroy";
    }
  }
};
</script>
