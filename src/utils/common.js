export const getUser = () => {
    const userData = localStorage.getItem('__user');

    if (userData) {
        return JSON.parse(userData);
    }

    return null;
}

export const logout = () => {
    localStorage.removeItem('__token');
    localStorage.removeItem('__user');
    window.location.replace("/login")
}

export const getCartCounter = () => {
    const cart = JSON.parse(sessionStorage.getItem("__cart"));
    return !cart ? 0 : cart.length;
}

export const getCartProducts = () => {
    const cart = JSON.parse(sessionStorage.getItem("__cart"));
    return !cart ? [] : cart;
}

export const addEntry = (entry) => {
    let existingEntries = JSON.parse(sessionStorage.getItem("__cart"));
    if (existingEntries == null) existingEntries = [];

    existingEntries.push(entry);
    sessionStorage.setItem(
        '__cart',
        JSON.stringify(existingEntries),
    );
}

export const removeEntry = (id) => {
    let existingEntries = JSON.parse(sessionStorage.getItem("__cart"));
    if (existingEntries == null) existingEntries = [];

    const filtered = existingEntries.filter(item => item.product.id !== id);
    sessionStorage.setItem(
        '__cart',
        JSON.stringify(filtered),
    );
}

export const removeCart = () => {
    sessionStorage.removeItem("__cart");
}