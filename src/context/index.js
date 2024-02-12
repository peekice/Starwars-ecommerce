'use client'

import {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {

    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null)
    const [currentUpdateProduct,setCurrentUpdateProduct] = useState(null)
    const [showCartModal, setShowCartModal] = useState(false)
    const [showNavModal, setShowNavModal] = useState(false);
    const [cartItems, setCartItems] = useState([])

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
        <GlobalContext.Provider value={{isAuthUser, setIsAuthUser, user, setUser,currentUpdateProduct,setCurrentUpdateProduct,showCartModal, setShowCartModal,showNavModal, setShowNavModal,cartItems, setCartItems}}>{children}</GlobalContext.Provider>
    )
}