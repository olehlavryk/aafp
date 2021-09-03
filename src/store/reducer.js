import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "src/store/initialState";
import {
    setIsLoggedIn,
    setIsOpenLoginModal,
    setIsOpenRegisterModal,
    setIsOpenFavoriteModal,
    setLoading,
    setUserData,
    setStoreProducts,
    setOffset,
    setMore,
    setSearch,
    setCategories,
    setCurrentCategory,
    setSort,
    setSelectedProduct,
    setSelectedOrder,
    setCartCounter,
    setNotification,
    setCart,
    setOrdered,
    setOrders,
    setFavorites
} from "src/store/actions";

export const reducer = createReducer(initialState, {
    [setLoading]: (state, action) => {
        state.loading = action.payload;
    },
    [setIsLoggedIn]: (state, action) => {
        state.isLoggedIn = action.payload;
    },
    [setIsOpenLoginModal]: (state, action) => {
        state.isOpenLoginModal = action.payload;
    },
    [setIsOpenRegisterModal]: (state, action) => {
        state.isOpenRegisterModal = action.payload;
    },
    [setIsOpenFavoriteModal]: (state, action) => {
        state.isOpenFavoriteModal = action.payload;
    },
    [setUserData]: (state, action) => {
        state.user = action.payload;
    },
    [setStoreProducts]: (state, action) => {
        state.products = action.payload;
    },
    [setOffset]: (state, action) => {
        state.offset = action.payload;
    },
    [setMore]: (state, action) => {
        state.more = action.payload;
    },
    [setSearch]: (state, action) => {
        state.search = action.payload;
    },
    [setCategories]: (state, action) => {
        state.catgories = action.payload;
    },
    [setCurrentCategory]: (state, action) => {
        state.currentCategory = action.payload;
    },
    [setSort]: (state, action) => {
        state.sort = action.payload;
    },
    [setSelectedProduct]: (state, action) => {
        state.selectedProduct = action.payload;
    },
    [setSelectedOrder]: (state, action) => {
        state.selectedOrder = action.payload;
    },
    [setCartCounter]: (state, action) => {
        state.cartCounter = action.payload;
    },
    [setNotification]: (state, action) => {
        state.notification = action.payload;
    },
    [setCart]: (state, action) => {
        state.cart = action.payload;
    },
    [setOrdered]: (state, action) => {
        state.ordered = action.payload;
    },
    [setOrders]: (state, action) => {
        state.orders = action.payload;
    },
    [setFavorites]: (state, action) => {
        state.favorites = action.payload;
    },
});