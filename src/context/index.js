'use client'

import {createContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {usePathname, useRouter} from "next/navigation";

export const GlobalContext = createContext(null);

export const initialCheckoutFormData = {
    shippingAddress: {},
    paymentMethod: '',
    totalPrice: 0,
    isPaid: false,
    paidAt: new Date(),
    isProcessing: true,
}

const protectedRoutes = [
    'cart',
    'checkout',
    'account',
    'order',
    'admin-view',
];
const protectedAdminRoutes = [
    '/admin-view',
    '/admin-view/add-product',
    '/admin-view/all-products',
]

export default function GlobalState({children}) {


    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null)
    const [currentUpdateProduct, setCurrentUpdateProduct] = useState(null);
    const [showCartModal, setShowCartModal] = useState(false);
    const [showNavModal, setShowNavModal] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState([]);
    const [addressFormData, setAddressFormData] = useState({
        fullName: '',
        address: '',
        star: '',
    });
    const [checkoutFormData, setCheckoutFormData] = useState(initialCheckoutFormData);

    const [allOrder, setAllOrder] = useState([]);
    const [orderDetails, setOrderDetails] = useState(null);
    const [allOrderAdmin, setAllOrderAdmin] = useState({});

    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {

        if (Cookies.get('token') !== undefined) {
            setIsAuthUser(true);
            const userData = JSON.parse(localStorage.getItem('user')) || {};
            const getCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            setUser(userData);
            setCartItems(getCartItems);
        } else {
            setIsAuthUser(false);
            setUser({});
        }

    }, [Cookies])

    useEffect(() => {
        if (pathName !== '/register' && user && Object.keys(user).length === 0 && !protectedRoutes.includes(pathName)) {
            router.push('/login')
        }
    }, [user, pathName])

    useEffect(() => {
        if (user !== null && user && Object.keys(user).length > 0 && user?.role !== 'admin' && protectedAdminRoutes.indexOf(pathName) > -1) {
            router.push('/unauthorized-page')
        }
    }, [user, pathName])

    return (
        <GlobalContext.Provider value={{
            isAuthUser,
            setIsAuthUser,
            user,
            setUser,
            currentUpdateProduct,
            setCurrentUpdateProduct,
            showCartModal,
            setShowCartModal,
            showNavModal,
            setShowNavModal,
            cartItems,
            setCartItems,
            address,
            setAddress,
            addressFormData,
            setAddressFormData,
            checkoutFormData,
            setCheckoutFormData,
            allOrder,
            setAllOrder,
            orderDetails,
            setOrderDetails,
            allOrderAdmin,
            setAllOrderAdmin
        }}>{children}</GlobalContext.Provider>
    )
}