const ACCESS_TOKEN = 'access_token';
const USER_ID = 'user_id';

export const setToken = (token: string) => {
    return localStorage.setItem(ACCESS_TOKEN, token);
}
export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}
export const removeToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN);
}

export const setUserId = (id: string) => {
    return localStorage.setItem(USER_ID, id);
}
export const getUserId = () => {
    return localStorage.getItem(USER_ID);
}
export const removeUserId = () => {
    return localStorage.removeItem(USER_ID);
}
