'use client'

import {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {

    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null)

    useEffect(()=>{

        if(Cookies.get('token')!== undefined){
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            setUser(userData)
        }
        else{
            setIsAuthUser(false)
        }

    },[Cookies])

    return (
        <GlobalContext.Provider value={{isAuthUser, setIsAuthUser, user, setUser}}>{children}</GlobalContext.Provider>
    )
}