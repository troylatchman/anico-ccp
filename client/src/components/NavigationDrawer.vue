<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <v-list nav>
      <v-list-item v-for="item in links" :key="item.title" link :to="item.url">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-if="onCall">
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          v-for="item in callLinks"
          :key="item.title"
          link
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
// import PersistentInfo from "@/views/PersistentInfo.vue";
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.navigation.navigationOpen;
      },
      set(isOpen) {
        this.$store.dispatch("navigation/toggleNavigationDrawer", isOpen);
      }
    },
    ...mapState("cti", ["onCall"]),
    onCall() {
      if (!this.$store.state.cti.onCall) {
        this.resetCallLinks();
      }
      return this.$store.state.cti.onCall;
    },
    ...mapState("navigation", ["links", "callLinks"])
  },
  methods: {
    ...mapActions("navigation", ["resetCallLinks"])
  }
};
</script>

<style></style>
