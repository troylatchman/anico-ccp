import BookService from "@/services/BookService.js";

const state = {
  books: []
};

const getters = {
  getBookById: state => id => state.books.find(book => book.id === id)
};

const actions = {
  async fetchBook({ commit, getters }, id) {
    let book = getters.getBookById(id);
    if (book) {
      return book;
    } else {
      try {
        const response = await BookService.getBook(id);
        book = response.data;
        commit("addBook", response.data);
        return book;
      } catch (error) {
        console.error(`Book not found. ${error}`);
        throw error;
      }
    }
  },
  clearBooks({ commit }) {
    commit("clearBooks");
  }
};

const mutations = {
  addBook(state, book) {
    state.books.push(book);
  },
  clearBooks(state) {
    state.books = [];
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
