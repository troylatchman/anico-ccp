import Vue from "vue";
import Vuex from "vuex";
import cti from "./modules/cti";
import navigation from "./modules/navigation";
import books from "./modules/books";
import authService from "../services/AuthService.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cti,
    navigation,
    books
  },
  state: {
    environment: undefined,
    apiToken: null
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
    setAPIToken({ commit }, token) {
      commit("SET_API_TOKEN", token);
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
    }
  }
});
