import axios, {AxiosResponse} from "axios";
import {rootURL} from "../constants/URLs";
import {IProduct} from "../models/IProduct";

export default class ProductService {
    static async getPaginatedProducts(offset: number, limit: number): Promise<AxiosResponse<IProduct[]>> {
        return axios.get<IProduct[]>(`${rootURL}/items/list?offset=${offset}&limit=${limit}`)
    }
    static async getProduct(id: string): Promise<AxiosResponse<IProduct>> {
        return axios.get<IProduct>(`${rootURL}/items/${id}`)
    }
    static async getAllProductsByCategory(name: string, offset: number, limit: number): Promise<AxiosResponse<IProduct[]>> {
        return axios.get<IProduct[]>(`${rootURL}/items/?param=${name}&offset=${offset}&limit=${limit}`)
    }
    static async createProduct(product: any): Promise<AxiosResponse<IProduct>> {
        return axios.post<IProduct>(`${rootURL}/items/create`, product)
    }
    static async updateProduct(product: any): Promise<AxiosResponse<IProduct>> {
        return axios.put<IProduct>(`${rootURL}/items/update`, product)
    }
    // static async deleteProduct(id: string): Promise<AxiosResponse> {
    //     return axios.delete<IProduct>(`${rootURL}/products/${id}`)
    // }
}