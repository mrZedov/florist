import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `http://${process.env.VUE_APP_API_URL}/api/`;

class UserService {
  getPublicContent() {
    return axios.get(API_URL + "all");
  }

  getCard() {
    return axios.get(API_URL + "cards/studied", { headers: authHeader() });
  }

  getExam() {
    return axios.get(API_URL + "examination/studied", {
      headers: authHeader(),
    });
  }

  sendAnswerExam(id, n) {
    return axios.get(API_URL + "examination/check-answer", {
      headers: authHeader(),
      params: {
        id: id,
        n: n,
      },
    });
  }

  getModeratorBoard() {
    return axios.get(API_URL + "mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  sendAnswer(id, n) {
    return axios.get(API_URL + "cards/check-answer", {
      headers: authHeader(),
      params: {
        id: id,
        n: n,
      },
    });
  }
}

export default new UserService();
