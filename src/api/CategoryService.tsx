import axios, {AxiosResponse} from "axios";
import { rootURL } from "../constants/URLs";
import {ICategory} from "../models/ICategory";

export default class CategoryService {
    static async getCategories(): Promise<AxiosResponse<ICategory[]>> {
        return axios.get<ICategory[]>(`${rootURL}/categories/list`)
    }
    static async createCategory(category: Partial<ICategory>): Promise<AxiosResponse<ICategory>> {
        return axios.post<ICategory>(`${rootURL}/categories/create`, category)
    }
    static async updateCategory(id: number, category: Partial<ICategory>): Promise<AxiosResponse<ICategory>> {
        return axios.put<ICategory>(`${rootURL}/categories/${id}`, category)
    }
    static async deleteCategory(id: number): Promise<AxiosResponse<ICategory>> {
        return axios.delete<ICategory>(`${rootURL}/categories/delete/${id}`)
    }
}