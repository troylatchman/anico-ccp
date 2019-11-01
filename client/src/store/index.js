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
  state: {},
  mutations: {},
  actions: {}
});
