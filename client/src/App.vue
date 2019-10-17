<template>
  <v-app id="ccp-app">
    <AppBar />
    <NavigationDrawer />
    <v-content>
      <v-container fluid>
        <keep-alive :max="50">
          <router-view></router-view>
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
