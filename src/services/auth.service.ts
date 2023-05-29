import axios from "axios";
import authHeader from "../api/auth-header";
import {CurrentUserInfo} from "../dto/current-user-info.dto";

const API_URL = "http://193.124.114.46:3001/";

class AuthService {
    async signIn(email: string, password: string) {
        return axios
            .post(API_URL + "sessions/create", {
                email,
                password
            })
            .then(response => {
                if (response.data.id_token) {
                    localStorage.setItem("token", response.data.id_token);
                }

                return response.data;
            });
    }

    async signUp(email: string, username: string, password: string) {
        return axios
            .post(API_URL + "users", {
                email,
                username,
                password
            })
            .then(response => {
                console.log("sign-up response", response)

                if (response.data.id_token) {
                    localStorage.setItem("token", response.data.id_token);
                }

                return response.data;
            },
            error => {
                return error
            });
    }

    currentUserInfo() {
        return axios
            .get(API_URL + "api/protected/user-info", {headers: {Authorization: authHeader()}})
            .then(response => {
                return response.data;
            });
    }

    logOut() {
        localStorage.removeItem("token");
    }
}

export default new AuthService()

