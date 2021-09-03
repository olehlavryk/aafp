import axios from "axios";

class ApiAuth {

    constructor() {
        this._token = localStorage.getItem("__token") || null;
        axios.defaults.headers.common.Authorization = `Bearer ${this._token}`;
    }

    setToken(token) {
        this._token = token;
        localStorage.setItem("__token", token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    logout() {
        this._token = null;
        localStorage.removeItem("__token");
        localStorage.removeItem("__user");
        axios.defaults.headers.common.Authorization = `undefined`;
    }

    isLoggedIn() {
        return !!this._token;
    }

    async login({ email, password }) {
        return await axios.post("/api/auth/login", {
            email,
            password,
        });
    }

    register({ fullName, email, password, phone }) {
        return axios.post("/api/auth/register", {
            fullName,
            email,
            password,
            phone
        })
    }
};

export default new ApiAuth();
