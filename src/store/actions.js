import { createAction } from "@reduxjs/toolkit";
import ApiProducts from "src/api/apiProducts";
import ApiAuth from "src/api/apiAuth";
import ApiCategories from "src/api/apiCategories";
import ApiLocations from "src/api/apiLocations";
import ApiOrders from "src/api/apiOrders";
import ApiAccount from "src/api/apiAccount";

export const setIsLoggedIn = createAction("ApiAuth/setIsLoggedIn");
export const setLoading = createAction("loading/setLoding");
export const setIsOpenLoginModal = createAction("modal/setIsOpenLoginModal");
export const setIsOpenRegisterModal = createAction("modal/setIsOpenRegisterModal");
export const setIsOpenFavoriteModal = createAction("modal/setIsOpenFavoriteModal");
export const setUserData = createAction("user/setUserData");
export const setStoreProducts = createAction("products/setProducts");
export const setOffset = createAction("set/offset");
export const setMore = createAction("set/more");
export const setSearch = createAction("set/search");
export const setCategories = createAction("set/categories");
export const setCurrentCategory = createAction("set/currentCategory");
export const setSort = createAction("set/sort");
export const setSelectedProduct = createAction("set/selectedProduct");
export const setSelectedOrder = createAction("set/setSelectedOrder");
export const setCartCounter = createAction("set/setCartCounter");
export const setNotification = createAction("set/setNotification");
export const setCart = createAction("set/setCart");
export const setOrdered = createAction("set/setOrdered");
export const setOrders = createAction("set/setOrders");
export const setFavorites = createAction("set/setFavorites");

export const register = (payload) => async (dispatch) => {
    const responce = await ApiAuth.register(payload);
    dispatch(setToken(responce.data.token));
    dispatch(initUser(responce.data.account));
}

export const login = (payload) => async (dispatch) => {
    const responce = await ApiAuth.login(payload);
    dispatch(setToken(responce.data.token));
    dispatch(initUser(responce.data.account));
}

export const setToken = (payload) => async (dispatch) => {
    ApiAuth.setToken(payload);
    dispatch(setIsLoggedIn(true));
    dispatch(setIsOpenLoginModal(false));
}

export const initUser = (payload) => (dispatch) => {
    localStorage.setItem(
        '__user',
        JSON.stringify(payload),
    );
    dispatch(setUserData(payload))
}

export const logout = (payload) => (dispatch) => {
    ApiAuth.logout();
    dispatch(setIsLoggedIn(false));
    dispatch(setUserData(null))
    dispatch(setStoreProducts([]));
    dispatch(setCartCounter(0));
}

export const getProducts = (payload) => async (dispatch) => {
    return await ApiProducts.fetchProducts(payload);
}

export const getProductsByQuery = (payload) => async (dispatch) => {
    return await ApiProducts.fetchProductsByQuery(payload);
}

export const getProductsByCategory = (payload) => async (dispatch) => {
    return await ApiCategories.getProductsByCategory(payload);
}

export const getCategories = (payload) => async (dispatch) => {
    return await ApiCategories.getCategories();
}

export const addToFavorite = (payload) => async (dispatch) => {
    return await ApiProducts.addToFavorite(payload);
}

export const getFavorites = (payload) => async (dispatch) => {
    return await ApiProducts.getFavorites(payload);
}

export const removeFromFavorite = (payload) => async (dispatch) => {
    return await ApiProducts.removeFromFavorite(payload);
}

export const getLocations = (payload) => async (dispatch) => {
    return await ApiLocations.getLocations();
}

export const addOrder = (payload) => async (dispatch) => {
    return await ApiOrders.addOrder(payload);
}

export const getOrders = (payload) => async (dispatch) => {
    return await ApiOrders.getOrders(payload);
}

export const updateAccount = (payload) => async (dispatch) => {
    return await ApiAccount.updateAccount(payload);
}

export const updatePassword = (payload) => async (dispatch) => {
    return await ApiAccount.updatePassword(payload);
}
