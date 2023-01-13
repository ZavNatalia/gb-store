import React, {ReactNode, useContext, useState} from "react";
import {ICustomer} from "../models/ICustomer";

type CustomerProviderProps = {
    children: ReactNode
}

type CustomerContextProps = {
    customer: ICustomer,
    isAdmin: boolean,
    onChangeCustomer: (value: ICustomer) => void,
    onChangeAdmin: (value: boolean) => void
}

const CustomerContext = React.createContext({} as CustomerContextProps);

export const useCustomer = () =>  useContext(CustomerContext);

export const CustomerProvider = ({children}: CustomerProviderProps) => {
    const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);
    const [isAdmin, setIsAdmin] = useState(false);

    const onChangeCustomer = (value: ICustomer) => {
        setCustomer(value);
    };

    const onChangeAdmin = (value: boolean) => {
        setIsAdmin(value);
    }

    return (
        <CustomerContext.Provider
            value={{
                customer,
                isAdmin,
                onChangeCustomer,
                onChangeAdmin
            }}>
            {children}
        </CustomerContext.Provider>
    )
}
