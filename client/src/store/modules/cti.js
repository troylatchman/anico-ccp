import router from "@/router";

const state = {
  onCall: false
};

// getters
const getters = {};

// actions
const actions = {
  startCall({ commit }) {
    commit("setOnCall", true);
    router.push("/search");
  },
  endCall({ commit, dispatch }) {
    commit("setOnCall", false);
    dispatch("books/clearBooks", undefined, { root: true });
    dispatch("navigation/resetCallLinks", undefined, { root: true });
    router.push("/").catch(() => {});
  }
};

// mutations
const mutations = {
  setOnCall(state, isOnCall) {
    state.onCall = isOnCall;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
