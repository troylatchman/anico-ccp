import Vue from "vue";
import Vuex from "vuex";
import cti from "./modules/cti";
import navigation from "./modules/navigation";
import books from "./modules/books";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cti,
    navigation,
    books
  },
  state: {
    environment: undefined
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
    }
  },
  mutations: {
    environment(state, env) {
      state.environment = env;
    }
  }
});
