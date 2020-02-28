import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_CCP_API_BASE_URL,
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
