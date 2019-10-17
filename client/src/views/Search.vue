<template>
  <v-form ref="form" v-model="valid" @submit.prevent="submit">
    <v-text-field
      v-model="searchParam"
      label="Policy Number"
      required
      :rules="[v => !!v || 'Please enter a policy number']"
    ></v-text-field>
    <v-btn :disabled="!valid" @click="submit">Search</v-btn>
  </v-form>
</template>

<script>
import router from "@/router";
import { mapActions } from "vuex";
export default {
  data: () => ({
    valid: false,
    searchParam: ""
  }),
  methods: {
    submit() {
      let policyNumber = this.searchParam;
      let policyLastFour = policyNumber.substring(policyNumber.length - 4);
      const url = `/life-policy/${this.searchParam}`;
      this.addCallLink({
        title: `Life Policy - ${policyLastFour}`,
        icon: "mdi-folder-information",
        url
      });
      router.push(url);
    },
    ...mapActions("navigation", ["addCallLink"])
  }
};
</script>

<style></style>
