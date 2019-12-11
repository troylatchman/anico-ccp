<template>
  <v-app id="ccp-app">
    <AppBar />
    <NavigationDrawer />
    <v-content>
      <v-container fluid>
        <!-- There is an issue in vue-loader when using keep-alive  -->
        <!-- Comment the beginning and end tags during development to keep HMR functioning -->
        <!-- For more details: https://github.com/vuejs/vue-loader/issues/1332 -->
        <keep-alive :max="50">
          <router-view :key="$route.fullPath"></router-view>
        </keep-alive>
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
  }
};
</script>
