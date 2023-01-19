const ACCESS_TOKEN = 'access_token';
const CART_ID = 'cartId';

export const setToken = (token: string) => {
    return localStorage.setItem(ACCESS_TOKEN, token);
}
export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}
export const removeToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN);
}

export const setCartId = (id: string) => {
    return localStorage.setItem(CART_ID, id);
}
export const getCartId = () => {
    return localStorage.getItem(CART_ID);
}
export const removeCartId = () => {
    return localStorage.removeItem(CART_ID);
}
