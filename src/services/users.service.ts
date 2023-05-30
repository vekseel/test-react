import axios from "axios";
import authHeader from "../api/auth-header";
import {UserListItem} from "../dto/user-list-item.dto";

const API_URL = "http://193.124.114.46:3001/";

class UsersService {
    async users(filter: string) : Promise<UserListItem[]> {
        return axios
            .post(API_URL + "api/protected/users/list", {filter},{ headers: { Authorization: authHeader() }})
            .then(response => {
                return response.data;
            });
    }
}

export default new UsersService()

