import axios, {AxiosResponse} from "axios";
import { rootURL } from "../constants/URLs";
import {ICategory} from "../models/ICategory";
import {IProduct} from "../models/IProduct";

export default class CategoryService {
    static async getCategories(): Promise<AxiosResponse<ICategory[]>> {
        return axios.get<ICategory[]>(`${rootURL}/categories`)
    }
    static async createCategory(category: Partial<ICategory>): Promise<AxiosResponse<ICategory>> {
        return axios.post<ICategory>(`${rootURL}/categories`, category)
    }
    static async updateCategory(id: number, category: Partial<ICategory>): Promise<AxiosResponse<ICategory>> {
        return axios.put<ICategory>(`${rootURL}/categories/${id}`, category)
    }
    static async deleteCategory(id: number): Promise<AxiosResponse> {
        return axios.delete<ICategory>(`${rootURL}/categories/${id}`)
    }
    static async getAllProductsByCategory(id: number): Promise<AxiosResponse<IProduct[]>> {
        return axios.get<IProduct[]>(`${rootURL}/categories/${id}/products`)
    }

}