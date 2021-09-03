import axios from 'axios';
import { PRODUCTS_NUMBER, PRODUCTS_SORT } from "src/utils/config";

class ApiProducts {
    constructor() {
        this._token = localStorage.getItem("__token") || null;
        axios.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }

    async fetchProducts(payload) {
        const { offset = 0, limit = PRODUCTS_NUMBER, sort = PRODUCTS_SORT } = payload;

        return await axios.get(`/api/products?offset=${offset}&limit=${limit}&sortBy=${sort}`);
    }

    async fetchProductsByQuery(payload) {
        const { keywords, offset = 0, limit = PRODUCTS_NUMBER } = payload;
        return await axios.get(`/api/products/search?keywords=${keywords}&offset=${offset}&limit=${limit}`);
    }

    fetchSaved() {
        return axios.get("/api/products/saved");
    }

    getById(id) {
        return axios.get(`/api/products/${id}`);
    }

    byUserId(id) {
        return axios.get(`/api/users/${id}/products`);
    }

    addToFavorite(id) {
        return axios.post(`/api/products/${id}/favorite`);
    }

    removeFromFavorite(id) {
        return axios.delete(`/api/products/${id}/favorite`);
    }

    async getFavorites() {
        return await axios.get(`/api/products/favorites`);
    }
};

export default new ApiProducts();