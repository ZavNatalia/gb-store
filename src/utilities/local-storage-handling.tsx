const ACCESS_TOKEN = 'access_token';

export const setToken = (token: string) => {
    return localStorage.setItem(ACCESS_TOKEN, token);
}
export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}
export const removeToken = () => {
    return localStorage.removeItem(ACCESS_TOKEN);
}
