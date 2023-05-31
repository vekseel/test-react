import axios from "axios";
import authHeader from "../api/auth-header";
import { Api } from '../api/api';

class TransactionsService {
    async transactions() {
        return axios
            .get(Api.ApiPath + Api.Transactions, {headers: {Authorization: authHeader()}})
            .then(response => {
                return response.data;
            });
    }

    async transfer(name: string, amount: number) {
        return axios
            .post(Api.ApiPath + Api.Transfer,{name, amount}, {headers: {Authorization: authHeader()}})
            .then(response => {
                return response.data;
            });
    }
}

export default new TransactionsService()

