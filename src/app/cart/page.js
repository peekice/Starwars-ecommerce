'use client'

import {deleteFromCart, getAllCartItems} from "@/services/cart";
import {useContext, useEffect} from "react";
import {GlobalContext} from "@/context";
import CommonCart from "@/components/CommonCart";
import {toast} from "react-toastify";

export default function Cart() {

    const {user, setCartItems, cartItems} = useContext(GlobalContext);

    async function extractAllCartItem() {
        const res = await getAllCartItems(user._id)
        if (res.success) {
            const updateData = res.data && res.data.length ?
                res.data.map(item => ({
                    ...item,
                    productID: {
                        ...item.productID,
                        price: item.productID.onSale === 'yes' ? parseInt((item.productID.price - item.productID.price * (item.productID.priceDrop / 100)).toFixed(2)) : item.productID.price
                    }
                }))
                : [];
            setCartItems(updateData)
            localStorage.setItem('cartItems', JSON.stringify(updateData))
        }
    }

    useEffect(() => {
        if (user !== null) extractAllCartItem();
    }, [user])

    async function handleDeleteCartItem(cartItemID) {
        const res = await deleteFromCart(cartItemID)

        if (res.success) {
            toast.success(res.message, {
                position: "top-right"
            });
            extractAllCartItem()
        } else {
            toast.error(res.message, {
                position: "top-right"
            });
        }
    }


    return <CommonCart handleDeleteCartItems={handleDeleteCartItem} cartItems={cartItems}/>
}