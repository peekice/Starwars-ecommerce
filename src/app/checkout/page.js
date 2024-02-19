'use client'

import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/context";
import {getAllAddress} from "@/services/address";
import {useRouter, useSearchParams} from "next/navigation";
import {loadStripe} from "@stripe/stripe-js";
import {callStripeSession} from "@/services/stripe";
import {creatNewOrder} from "@/services/order";

export default function Checkout() {

    const {cartItems, user, address, setAddress, checkoutFormData, setCheckoutFormData} = useContext(GlobalContext);
    const router = useRouter();
    const params = useSearchParams();

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const publishableKey = 'pk_test_51OlbEgGmbckm5SEdbkImMzPwEqjEzimz8WYMAQaUayueH0fOtHpKGe5wSc8utVA9viRfdNIAn48X9eIHr6eNBRW500SHEszVwZ';
    const stripePromise = loadStripe(publishableKey);

    async function getAllAdd() {
        const res = await getAllAddress(user?._id);

        if (res.success) {
            setAddress(res.data)
        }
    }

    function handleSelectedAddress(getAddress) {

        if (getAddress._id === selectedAddress) {
            setSelectedAddress(null);
            setCheckoutFormData({
                ...checkoutFormData,
                shippingAddress: {}
            })

            return;
        }

        setSelectedAddress(getAddress._id);
        setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {
                ...checkoutFormData.shippingAddress,
                fullName: getAddress.fullName,
                address: getAddress.address,
                star: getAddress.star,
            }
        })
    }

    async function handleCheckout() {
        const stripe = await stripePromise;

        const createLineItems = cartItems.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    images: [item.productID.imageUrl],
                    name: item.productID.name,
                },
                unit_amount: item.productID.price * 100,
            },
            quantity: 1,
        }));

        const res = await callStripeSession(createLineItems);
        localStorage.setItem("stripe", true);
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

        const {error} = await stripe.redirectToCheckout({
            sessionId: res.id,
        });

        console.log(error);
    }


    useEffect(() => {
        if (user !== null) {
            getAllAdd()
        }
    }, [user])

    useEffect(() => {
        async function createFinalOrder() {
            const isStripe = JSON.parse(localStorage.getItem("stripe"));

            if (
                isStripe &&
                params.get("status") === "success" &&
                cartItems &&
                cartItems.length > 0
            ) {
                const getCheckoutFormData = JSON.parse(
                    localStorage.getItem("checkoutFormData")
                );

                const createFinalCheckoutFormData = {
                    user: user?._id,
                    shippingAddress: getCheckoutFormData.shippingAddress,
                    orderItems: cartItems.map((item) => ({
                        qty: 1,
                        product: item.productID,
                    })),
                    paymentMethod: "Stripe",
                    totalPrice: cartItems.reduce(
                        (total, item) => item.productID.price + total,
                        0
                    ),
                    isPaid: true,
                    isProcessing: true,
                    paidAt: new Date(),
                };

                const res = await creatNewOrder(createFinalCheckoutFormData);

                if (res.success) {
                    setOrderSuccess(true);
                } else {
                    setOrderSuccess(false);
                }
            }
        }

        createFinalOrder();
    }, [params.get("status"), cartItems]);


    useEffect(()=>{
        if(orderSuccess){
            setTimeout(()=>{
                setOrderSuccess(false);
                router.push('/orders')
                }
            ,[3000])
        }
    },[orderSuccess])

    if (orderSuccess) {
        return (
            <section className="h-screen bg-gray-200">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
                        <div className="bg-white shadow">
                            <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                                <h1 className="font-bold text-lg">
                                    Your payment is successful and you will be redirected to order page in 3 seconds !!!
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }


    return (
        <div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px32 mt-10">
                <div className="px-4 pt-5">
                    <p className="font-medium text-xl">Cart</p>
                    <div className="mt-8 space-y-2 rounded-lg border bg-white px-2 py-4 sm:px-5">
                        {
                            cartItems && cartItems.length ?
                                cartItems.map(item => <div className="flex flex-col rounded-lg bg-white sm:flex-row"
                                                           key={item.id}>
                                    <img src={item && item.productID && item.productID.imageUrl} alt="Product image"
                                         className="m-2 h-24 w-28 rounded-md object-cover object-center"/>
                                    <div className="flex w-full flex-col px-4 py-4">
                                        <span
                                            className="font-bold">{item && item.productID && item.productID.name}</span>
                                        <span
                                            className="font-semibold">{item && item.productID && item.productID.price}</span>
                                    </div>
                                </div>)
                                :
                                <div>Your cart is empty</div>
                        }
                    </div>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Shipping address details</p>
                    <p className="text-gray-400 font-bold">Complete your order by selecting address below</p>
                    <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
                        {
                            address && address.length ? address.map(item =>
                                    <div
                                        className={`${item._id === selectedAddress ? "border border-red-900 p-6" : "border p-6"}`}
                                        key={item._id}>
                                        <p>Name : {item.fullName}</p>
                                        <p>Star : {item.star}</p>
                                        <p>Address : {item.address}</p>
                                        <button onClick={() => handleSelectedAddress(item)}
                                                className="mt-5 mr-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                            {item._id === selectedAddress ? "Selected" : "Select address"}
                                        </button>
                                    </div>)
                                : <p>No address found, Please add your address</p>
                        }
                    </div>
                    <button onClick={() => router.push("/account")}
                            className="mt-5 mr-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                        Add new address
                    </button>
                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="text-lg font-bold text-gray-900"> $ {cartItems && cartItems.length ? cartItems.reduce((total, item) => item.productID.price + total, 0) : '0'} </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                            <p className="text-sm font-medium text-gray-900">Free</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-lg font-bold text-gray-900"> $ {cartItems && cartItems.length ? cartItems.reduce((total, item) => item.productID.price + total, 0) : '0'} </p>
                        </div>
                    </div>
                    <div className="pb-10">
                        <button
                            onClick={handleCheckout}
                            disabled={(cartItems && cartItems.length === 0) || Object.keys(checkoutFormData.shippingAddress).length === 0}
                            className="disabled:opacity-50 mt-5 mr-3 w-full inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}