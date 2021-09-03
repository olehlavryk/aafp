import axios from "axios";
import { PRODUCTS_NUMBER, PRODUCTS_SORT } from "src/utils/config";

class ApiLocations {
    constructor() {
        this._token = localStorage.getItem("__token") || null;
        axios.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }

    async getLocations() {
        return await axios.get("/api/locations/countries");
    }
}

export default new ApiLocations();