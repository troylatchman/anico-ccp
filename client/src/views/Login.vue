<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <div class="title">
                Welcome back, please sign in
              </div>
              <v-card-text>
                <v-form>
                  <v-text-field
                    type="text"
                    placeholder="Username"
                    v-model="userId"
                    autocomplete="off"
                  />
                  <v-text-field
                    type="password"
                    password
                    placeholder="Password"
                    v-model="password"
                    autocomplete="off"
                  />
                  <v-text-field
                    type="text"
                    placeholder="Agent Id"
                    v-model="agentId"
                    autocomplete="off"
                  />
                  <v-text-field
                    type="text"
                    placeholder="Extension"
                    v-model="extension"
                    autocomplete="off"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="actions">
                <v-btn
                  block
                  :disabled="!formValid"
                  @click.prevent="authenticate()"
                >
                  Sign In
                </v-btn>
                <div class="reset-password" @click.prevent="resetPassword()">
                  Reset Password
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
//import store from "../store";

export default Vue.extend({
  props: {
    reset: { type: Boolean, default: false }
  },
  data() {
    return {
      title: "American National Insurance Co - CCP",
      userId: "",
      password: "",
      agentId: "",
      extension: ""
    };
  },
  methods: {
    resetForm() {
      this.$store.dispatch("clearLogin");
      this.password = "";
    },
    authenticate() {
      const userId = this.userId;
      const password = this.password;
      console.log(userId, password);
      this.$router.push({
        name: "uad",
        params: { userId: this.userId, token: this.token }
      });
    }
  },
  computed: {
    formValid() {
      return this.userId.length > 0 && this.password.length > 0;
    },
    ...mapState(["token", "loginMsg"])
  },
  mounted() {
    this.$store.state.userId = "Tracy"; //TODO: DEV ONLY!!!
  }
});
</script>

<style scoped lang="css">
.title {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.actions {
  display: flex;
  flex-direction: column;
}

.reset-password {
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
