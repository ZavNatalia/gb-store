import React, {ReactNode, useContext, useState} from "react";
import {ICustomer} from "../models/ICustomer";

type CustomerProviderProps = {
    children: ReactNode
}

type CustomerContextProps = {
    customer: ICustomer
    onChangeCustomer: (value: ICustomer) => void
}

const CustomerContext = React.createContext({} as CustomerContextProps);

export const useCustomer = () =>  useContext(CustomerContext);

export const CustomerProvider = ({children}: CustomerProviderProps) => {
    const [customer, setCustomer] = useState<ICustomer>({} as ICustomer);

    const onChangeCustomer = (value: ICustomer) => {
        setCustomer(value);
    };

    return (
        <CustomerContext.Provider
            value={{
                customer,
                onChangeCustomer,
            }}>
            {children}
        </CustomerContext.Provider>
    )
}
