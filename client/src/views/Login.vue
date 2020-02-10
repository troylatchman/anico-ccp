<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row v-if="mode === 'login'" align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <div class="title">
                Welcome back, please sign in
              </div>
              <v-card-text>
                <v-alert v-if="loginMessage.length > 0" type="error">{{
                  loginMessage
                }}</v-alert>
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
        <v-row v-else align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <div class="title">
                Reset Password
              </div>
              <v-card-text>
                <v-form>
                  <v-text-field
                    type="text"
                    placeholder="Enter Email associated with your account"
                    v-model="resetEmail"
                    autocomplete="off"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="actions">
                <v-btn
                  block
                  :disabled="resetEmail.length === 0"
                  @click.prevent="requestReset()"
                >
                  Request Reset Password Link
                </v-btn>
                <div class="reset-password" @click.prevent="mode = 'login'">
                  Return to Login
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
import authService from "../services/AuthService.js";
import { mapState } from "vuex";
// import store from "../store";

export default Vue.extend({
  components: {},
  props: {
    reset: { type: Boolean, default: false }
  },
  data() {
    return {
      title: "American National Insurance Co - CCP",
      mode: "login",
      userId: "",
      password: "",
      agentId: "",
      extension: "",
      loginMessage: "",
      resetEmail: ""
    };
  },
  computed: {
    formValid() {
      return this.userId.length > 0 && this.password.length > 0;
    },
    ...mapState(["apiToken", "loginMsg"])
  },
  watch: {
    userId() {
      if (this.loginMessage.length > 0) {
        this.loginMessage = "";
      }
    },
    password() {
      if (this.loginMessage.length > 0) {
        this.loginMessage = "";
      }
    }
  },
  methods: {
    resetPassword() {
      this.mode = "reset";
    },
    requestReset() {
      // this.$store.dispatch("clearLogin");
      this.password = "";
    },
    authenticate() {
      const userId = this.userId;
      const password = this.password;
      console.log(userId, password);
      authService.authenticate(userId, password).then(res => {
        if (res.data.status) {
          this.$store.dispatch("setAPIToken", res.data.token);
          this.$router.push({
            name: "uad",
            params: { userId: this.userId, token: this.token }
          });
        } else {
          this.loginMessage = res.data.msg;
        }
      });
    }
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
  cursor: pointer;
}

v-btn {
  cursor: pointer;
}
</style>
