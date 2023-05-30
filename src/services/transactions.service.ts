import axios from "axios";
import authHeader from "../api/auth-header";

const API_URL = "http://193.124.114.46:3001/";

class TransactionsService {
    async transactions() {
        return axios
            .get(API_URL + "api/protected/transactions", {headers: {Authorization: authHeader()}})
            .then(response => {
                return response.data;
            });
    }

    async transfer(name: string, amount: number) {
        return axios
            .post(API_URL + "api/protected/transactions",{name, amount}, {headers: {Authorization: authHeader()}})
            .then(response => {
                return response.data;
            });
    }
}

export default new TransactionsService()

