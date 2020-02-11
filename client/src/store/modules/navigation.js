const defaultCallLinks = [
  {
    title: "Search",
    icon: "mdi-account-search",
    url: "/search"
  }
];

const state = {
  navigationOpen: true,
  links: [
    { title: "Home", icon: "mdi-home", url: "/uad/home" },
    { title: "About", icon: "mdi-information", url: "/uad/about" },
    { title: "Log Out", icon: "mdi-information", url: "/login" }
  ],
  callLinks: [
    {
      title: "Search",
      icon: "mdi-account-search",
      url: "/uad/search"
    }
  ]
};

// getters
const getters = {};

// actions
const actions = {
  addCallLink({ commit, state }, linkObject) {
    let newCallLinks = state.callLinks.slice();
    if (!newCallLinks.find(element => element.url === linkObject.url)) {
      newCallLinks.push(linkObject);
      commit("setCallLinks", newCallLinks);
    }
  },
  resetCallLinks({ commit }) {
    commit("setCallLinks", defaultCallLinks);
  },
  toggleNavigationDrawer({ state, commit }, isOpen) {
    if (isOpen === undefined) {
      if (state.navigationOpen) {
        commit("setNavOpen", false);
      } else {
        commit("setNavOpen", true);
      }
    } else commit("setNavOpen", isOpen);
  }
};

// mutations
const mutations = {
  setNavOpen(state, isOpen) {
    state.navigationOpen = isOpen;
  },
  setCallLinks(state, callLinks) {
    state.callLinks = callLinks;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
