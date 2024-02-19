'use client'

import CommonModel from "@/components/CommonModel";
import {Fragment, useContext, useEffect} from "react";
import {GlobalContext} from "@/context";
import {deleteFromCart, getAllCartItems} from "@/services/cart";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";


export default function CartModal() {

    const {showCartModal, setShowCartModal, user, cartItems, setCartItems} = useContext(GlobalContext);
    const router = useRouter();


    async function extractAllCartItem() {
        const res = await getAllCartItems(user._id)
        if (res.success) {
            setCartItems(res.data)
            localStorage.setItem('cartItems', JSON.stringify(res.data))
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

    return (
        <CommonModel
            showButtons={true}
            show={showCartModal}
            setShow={setShowCartModal}
            mainContent={
                cartItems && cartItems.length ?
                    <ul role="list" className="-my-6 divide-y divide-gray-300">
                        {cartItems.map(cartItem =>
                            <li key={cartItem.id} className="flex py-6">
                                <div
                                    className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img src={cartItem && cartItem.productID && cartItem.productID.imageUrl}
                                         alt="Product Image" className="h-full w-full object-cover object-center"/>
                                </div>
                                <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <h3><a>{cartItem && cartItem.productID && cartItem.productID.name}</a></h3>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">${cartItem && cartItem.productID && cartItem.productID.price}</p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                        <button type="button" onClick={() => handleDeleteCartItem(cartItem._id)}
                                                className="font-medium text-red-600 sm:order-2">Remove
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                    : null
            }
            buttonComponent={
                <Fragment>
                    <button onClick={()=>{router.push('/cart');setShowCartModal(false)}} type="button" className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase">Go to cart</button>
                    <button onClick={()=>{router.push('/checkout');setShowCartModal(false)}}  disabled={cartItems && cartItems.length === 0} type="button" className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase disabled:opacity-50">Checkout</button>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
                        <button type="button" className="font-medium text-gray">Continue Shopping</button>
                        <span aria-hidden="true"> &rarr;</span>
                    </div>
                </Fragment>
            }
        />)
}