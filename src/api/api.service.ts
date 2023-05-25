import axios from "axios";

const API_URL = "http://193.124.114.46:3001/";

class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "sessions/create", {
                email,
                password
            })
            .then(response => {
                if (response.data.id_token) {
                    localStorage.setItem("token", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username: string, email: string, password: string) {
        return axios.post(API_URL + "users", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return axios
            .get(API_URL + "/api/protected/user-info")
            .then(response => {
                if (response.data.id_token) {
                    localStorage.setItem("token", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    transactions() {
        return axios
            .get(API_URL + "/api/protected/transactions")
            .then(response => {
                return response.data;
            });
    }
}

export default new AuthService();
