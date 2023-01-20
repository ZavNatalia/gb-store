import axios, {AxiosResponse} from "axios";
import {rootURL} from "../constants/URLs";
import {ICart} from "../models/ICart";

export default class CartService {
    static async getCart(cartId: string): Promise<AxiosResponse<ICart>> {
        return axios.get<ICart>(`${rootURL}/cart/${cartId}`)
    }
    static async getCartByUserId(userId: string): Promise<AxiosResponse> {
        return axios.get(`${rootURL}/cart/byUser/${userId}`)
    }
    static async createCart(userId: string): Promise<AxiosResponse> {
        return axios.post(`${rootURL}/cart/create/${userId}`)
    }
    static async addItemToCart(cartId: string, id: string): Promise<AxiosResponse> {
        return axios.put(`${rootURL}/cart/addItem`, {cartId: cartId, itemId: id})
    }
    static async deleteCart(cartId: string): Promise<AxiosResponse> {
        return axios.delete(`${rootURL}/cart/delete/${cartId}`)
    }
    static async deleteItemFromCart(cartId: string, id: string): Promise<AxiosResponse> {
        return axios.delete(`${rootURL}/cart/delete/${cartId}/${id}`)
    }
}