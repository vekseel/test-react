import axios from "axios";
import authHeader from "../api/auth-header";
import { CurrentUserInfo } from "../dto/current-user-info.dto";
import { Api } from '../api/api';

class AuthService {
    async signIn(email: string, password: string) {
        return axios
            .post(Api.ApiPath + Api.SignIn, {
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
            .post(Api.ApiPath + Api.SignUp, {
                email,
                username,
                password
            })
            .then(response => {
                if (response.data.id_token) {
                    localStorage.setItem("token", response.data.id_token);
                }

                return response.data;
            },
            error => {
                return error
            });
    }

    currentUserInfo() : Promise<CurrentUserInfo> {
        if (!authHeader()){
            return new Promise<CurrentUserInfo>(() => {});
        }

        return axios
            .get(Api.ApiPath + Api.CurrentUserInfo, {headers: {Authorization: authHeader()}})
            .then(response => {
                return response.data;
            });
    }

    logOut() {
        localStorage.removeItem("token");
    }
}

export default new AuthService()

