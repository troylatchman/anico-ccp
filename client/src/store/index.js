import Vue from "vue";
import Vuex from "vuex";
import cti from "./modules/cti";
import navigation from "./modules/navigation";
import books from "./modules/books";
import authService from "../services/AuthService.js";

Vue.use(Vuex);

const parseJwt = token => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default new Vuex.Store({
  modules: {
    cti,
    navigation,
    books
  },
  state: {
    environment: undefined,
    apiToken: null,
    apiTokenPayload: "",
    userName: "",
    userRole: ""
  },
  actions: {
    async getEnvironment({ commit, state }) {
      if (state.environment) {
        return state.environment;
      } else {
        // potentially fetch environment from API
        // for now, we have a special variable
        const env = process.env.VUE_APP_ANICO_ENV;
        commit("environment", env);
        return env;
      }
    },
    setAPIToken({ commit, state }, token) {
      commit("SET_API_TOKEN", token);
      const payload = parseJwt(token);
      commit("SET_API_TOKEN_PAYLOAD", payload);
      state.userName = payload.name;
      state.userRole = payload.role;
      authService.getPrivileges().then(res => {
        console.log(res);
      });
    }
  },
  mutations: {
    environment(state, env) {
      state.environment = env;
    },
    SET_API_TOKEN(state, token) {
      state.apiToken = token;
    },
    SET_API_TOKEN_PAYLOAD(state, o) {
      state.apiTokenPayload = o;
    }
  }
});
