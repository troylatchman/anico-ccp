import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

function sleep(ms) {
  return function(x) {
    return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

export default {
  async getBook(id) {
    return apiClient.get(`/books/${id}`).then(sleep(1000));
  }
};
