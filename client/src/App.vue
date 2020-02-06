<template>
  <div id="app" class="app">
    <router-view class="app-view-container" />
  </div>
</template>

<script lang="ts">
export default {
  components: {
    /*AppHeader,*/
  },
  data() {
    return {
      userId: "tracy",
      dataPath: "ccp"
    };
  },
  methods: {}
};
</script>

<style lang="css"></style>
