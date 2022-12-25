import {ICategory} from "./ICategory";

export type IProduct = {
    id: number,
    title: string,
    price: number,
    category: ICategory,
    description: string,
    image: string[],
    vendor: string
}