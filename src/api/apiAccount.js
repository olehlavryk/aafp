import axios from "axios";

class ApiAccount {
    constructor() {
        this._token = localStorage.getItem("__token") || null;
        axios.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }

    async updateAccount(data) {
        return await axios.put('/api/account', data);
    }

    async updatePassword(data) {
        return await axios.put('/api/account/password', data);
    }
}

export default new ApiAccount();