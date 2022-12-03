import axios from "axios";

const API_URL = `http://${process.env.VUE_APP_API_URL}/api/`;

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "auth/login", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        if (!response.data.error) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post(API_URL + "users", {
      login: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
