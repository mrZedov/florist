import axios from "axios";

const API_URL = "http://i-florist.pl/api/";

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
    return axios.post(API_URL + "signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
