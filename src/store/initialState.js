import { getCartCounter, getUser } from "src/utils/common";
import { PRODUCTS_NUMBER, PRODUCTS_OFFSET, PRODUCTS_SORT } from "src/utils/config";

export const initialState = {
    loading: true,
    isLoggedIn: !!localStorage.getItem("__token") || false,
    isOpenLoginModal: false,
    isOpenRegisterModal: false,
    isOpenFavoriteModal: false,
    user: getUser(),
    limit: PRODUCTS_NUMBER,
    offset: PRODUCTS_OFFSET,
    sort: PRODUCTS_SORT,
    products: [],
    more: false,
    search: "",
    catgories: [],
    currentCategory: 0,
    selectedProduct: null,
    selectedOrder: null,
    cartCounter: getCartCounter() || 0,
    notification: null,
    cart: [],
    ordered: null,
    orders: [],
    favorites: []
}