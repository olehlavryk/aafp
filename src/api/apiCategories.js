import axios from "axios";
import { PRODUCTS_NUMBER, PRODUCTS_SORT } from "src/utils/config";

class ApiCategories {
    constructor() {
        this._token = localStorage.getItem("__token") || null;
        axios.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }

    async getCategories() {
        return await axios.get("/api/categories");
    }

    async getProductsByCategory(payload) {
        const { id, offset = 0, limit = PRODUCTS_NUMBER, sort = PRODUCTS_SORT } = payload
        return await axios.get(`/api/categories/${id}/products?offset=${offset}&limit=${limit}&sortBy=${sort}`);
    }
}

export default new ApiCategories();