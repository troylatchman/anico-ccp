<template>
  <div>
    <p>This is a Life Policy with ID: {{ id }}</p>
    <hr />
    <div v-if="fetching" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-if="fetchError">
      <h2>Error when fetching book with ID: {{ id }}</h2>
      <p>{{ fetchError }}</p>
    </div>
    <div v-if="book">
      <h2>Fetched book with ID: {{ id }}</h2>
      <p>Title: {{ book.title }}</p>
      <p>Author: {{ book.author }}</p>
      <p>Description: {{ book.description }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    id: Number
  },
  data() {
    return {
      fetching: false,
      fetchError: undefined
    };
  },
  created: async function() {
    console.log("created id:" + this.id);
    console.log(`Environment: ${await this.getEnvironment()}`);
    this.fetchData();
  },
  computed: {
    book() {
      return this.getBookById(this.id);
    },
    ...mapGetters("books", ["getBookById"])
  },
  methods: {
    async fetchData() {
      if (this.fetching) return;
      try {
        this.fetchError = undefined;
        this.fetching = true;
        await this.fetchBook(this.id);
      } catch (error) {
        if (!error.response) {
          this.fetchError = "No connection to API";
        }
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          this.fetchError = error.response.data.message;
        }
      } finally {
        this.fetching = false;
      }
    },
    ...mapActions("books", ["fetchBook"]),
    ...mapActions(["getEnvironment"])
  }
};
</script>

<style></style>
