export interface ICustomer {
    avatar?: string
    email?: string
    id?: number,
    firstname?: string,
    lastname?: string,
    password?: string,
    address?: IAddress,
    role?: string
}

export interface IAddress {
    zipcode?: string,
    country?: string,
    city?: string,
    street?: string
}