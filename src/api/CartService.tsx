import axios, {AxiosResponse} from "axios";
import {rootURL} from "../constants/URLs";
import {ICart} from "../models/ICart";
import {getToken} from "../utilities/local-storage-handling";

const config = {
    headers: {Authorization: `Bearer ${getToken()}`}
};

export default class CartService {
    static async getCart(cartId: string): Promise<AxiosResponse<ICart>> {
        return axios.get<ICart>(`${rootURL}/cart/${cartId}`, config)
    }
    static async getCartByUserId(userId: string): Promise<AxiosResponse> {
        return axios.get(`${rootURL}/cart/byUser/${userId}`, config)
    }
    static async createCart(userId: string): Promise<AxiosResponse> {
        return axios.post(`${rootURL}/cart/create/${userId}`, config)
    }
    static async addItemToCart(cartId: string, id: string): Promise<AxiosResponse> {
        return axios.put(`${rootURL}/cart/addItem`, {cartId: cartId, itemId: id}, config)
    }
    static async deleteCart(cartId: string): Promise<AxiosResponse> {
        return axios.delete(`${rootURL}/cart/delete/${cartId}`, config)
    }
    static async deleteItemFromCart(cartId: string, id: string): Promise<AxiosResponse> {
        return axios.delete(`${rootURL}/cart/delete/${cartId}/${id}`, config)
    }
}