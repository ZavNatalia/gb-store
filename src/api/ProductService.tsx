import axios, {AxiosResponse} from "axios";
import {rootURL} from "../constants/URLs";
import {IProduct} from "../models/IProduct";

export default class ProductService {
    static async getAllProducts(): Promise<AxiosResponse<IProduct[]>> {
        return axios.get<IProduct[]>(`${rootURL}/products`)
    }
    static async getPaginatedProducts(offset: number, limit: number): Promise<AxiosResponse<IProduct[]>> {
        return axios.get<IProduct[]>(`${rootURL}/products?offset=${offset}&limit=${limit}`)
    }
    static async getProduct(id: string): Promise<AxiosResponse<IProduct>> {
        return axios.get<IProduct>(`${rootURL}/products/${id}`)
    }
    static async createProduct(product: Partial<IProduct>): Promise<AxiosResponse<IProduct>> {
        return axios.post<IProduct>(`${rootURL}/products/`, product)
    }
    static async updateProduct(product: Partial<IProduct>, productId: string): Promise<AxiosResponse<IProduct>> {
        return axios.put<IProduct>(`${rootURL}/products/${productId}`, product)
    }
    static async deleteProduct(id: string): Promise<AxiosResponse> {
        return axios.delete<IProduct>(`${rootURL}/products/${id}`)
    }
}