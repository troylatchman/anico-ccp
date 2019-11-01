<template>
  <v-app id="ccp-app">
    <AppBar />
    <NavigationDrawer />
    <v-content>
      <v-container fluid>
        <!-- There are caveats to using keep-alive, like using the "activated" hook  -->
        <keep-alive :max="50">
          <router-view></router-view>
          <!-- <router-view :key="$route.fullPath"></router-view> -->
          <!-- The above line seems to break hot reloading of pages -->
          <!-- Solution: have the resolved views "watch" the dynamic portion of the URL -->
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
