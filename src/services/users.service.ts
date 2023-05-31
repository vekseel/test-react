import axios from "axios";
import authHeader from "../api/auth-header";
import { UserListItem } from "../dto/user-list-item.dto";
import { Api } from '../api/api';

class UsersService {
    async users(filter: string) : Promise<UserListItem[]> {
        return axios
            .post(Api.ApiPath + Api.Users, {filter},{ headers: { Authorization: authHeader() }})
            .then(response => {
                return response.data;
            });
    }
}

export default new UsersService()

