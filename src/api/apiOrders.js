import axios from "axios";

class ApiOrders {
    constructor() {
        this._token = localStorage.getItem("__token") || null;
        axios.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }

    async addOrder(order) {
        return await axios.post("/api/orders", order);
    }

    async getOrders() {
        return await axios.get("/api/orders");
    }
}

export default new ApiOrders();