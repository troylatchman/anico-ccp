import axios from "axios";
import store from "../store";

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default class AuthService {
  static getPrivileges() {
    const apiToken = store.state.apiToken;
    return apiClient.get(`/authorize/privileges`, {
      headers: { Authorization: `Bearer ${apiToken}` }
    });
  }

  static authenticate(userId, password) {
    //return apiClient.get(`/authenticate/${userId}/${password}`);
    //TODO: development simulation
    return new Promise(resolve => {
      const oData = { status: false, msg: "", token: "" };
      if (password === "bad") {
        oData.status = false;
        oData.msg = "User Id or Password is not valid";
      } else {
        oData.status = true;
        oData.msg = "";
        oData.token =
          "https://jwt.io/#debugger-io?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRyYWN5IFNwcmF0dCIsInJvbGUiOiJTQ09fTElBX0NTUiAiLCJpYXQiOjE1MTYyMzkwMjJ9.2u7USxpMaIlhmdPw-JSRL7UFNU3oExXKe7r_U7iDd9E;";
      }
      resolve({ data: oData });
    });
  }
}
