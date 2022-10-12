import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getCard() {
    return axios.get(API_URL + "cards/studied", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  sendAnswer(n) {
    return axios.get(API_URL + "cards/checkAnswer", {
      headers: authHeader(),
      params: {
        n: n,
      },
    });
  }
}

export default new UserService();
