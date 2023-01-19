import axios, {AxiosResponse} from "axios";
import {rootURL} from "../constants/URLs";
import {ICart} from "../models/ICart";

export default class CartService {
    static async getCart(cartId: string): Promise<AxiosResponse<ICart>> {
        return axios.get<ICart>(`${rootURL}/cart/${cartId}`)
    }
    static async createCart(userId: string): Promise<AxiosResponse> {
        return axios.post<ICart>(`${rootURL}/cart/create/${userId}`)
    }
    static async addItemToCart(cartId: string, id: string): Promise<AxiosResponse> {
        return axios.put<ICart>(`${rootURL}/cart/addItem`, {cartId: cartId, itemId: id})
    }
    static async deleteCart(cartId: string): Promise<AxiosResponse> {
        return axios.delete<ICart>(`${rootURL}/cart/delete/${cartId}`)
    }
    static async deleteItemFromCart(cartId: string, id: string): Promise<AxiosResponse> {
        return axios.delete<ICart>(`${rootURL}/cart/delete/${cartId}/${id}`)
    }
}