<template>
  <v-app-bar app clipped-left color="primary" dark>
    <v-app-bar-nav-icon
      @click.stop="toggleNavigationDrawer()"
    ></v-app-bar-nav-icon>
    <v-toolbar-title>Contact Center Portal</v-toolbar-title>
    <div class="flex-grow-1">
      <div class="user-info-item">{{ userName }}</div>
      <div class="user-info-item">Role: {{ userRole }}</div>
    </div>
    <v-btn v-if="!onCall" color="green" @click.stop="startCall">
      <v-icon>mdi-phone</v-icon>
    </v-btn>
    <v-btn v-if="onCall" color="red" @click.stop="endCall">
      <v-icon>mdi-phone-off</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState(["userName", "userRole"]),
    ...mapState("cti", ["onCall"])
  },
  methods: {
    ...mapActions("navigation", ["toggleNavigationDrawer"]),
    ...mapActions("cti", ["startCall", "endCall"])
  }
};
</script>
<style scoped>
.flex-grow-1 {
  display: flex;
  flex-direction: row;
}
.user-info-item {
  margin: 0 5px 0 5px;
}
</style>
