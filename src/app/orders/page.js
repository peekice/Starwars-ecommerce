'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/context";
import {getAllOrders} from "@/services/order";
import {useRouter} from "next/navigation";

export default function Orders(){

    const {user,allOrder, setAllOrder} = useContext(GlobalContext);
    const router = useRouter();

    async function extractAllOrder(){
        const res = await getAllOrders(user?._id);
        if(res.success){
            setAllOrder(res.data)
        }
    }

    useEffect(()=>{
        if(user !== null){
            extractAllOrder();
        }
    },[user])

    return(
        <section>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="px-4 py-6 sm:px-8 sm:py-10">
                            <div className="flow-root">{
                                allOrder && allOrder.length ?
                                    <ul className="flex flex-col gap-4">
                                        {
                                            allOrder.map(item=>
                                            <li key={item.id} className="bg-gray-50 shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                <div className="flex">
                                                    <h1 className="font-bold text-lg mb-3 flex-1">#order: {item._id}</h1>
                                                    <div className="flex items-center">
                                                        <p className="mr-3 text-sm font-medium text-gray-900">Total paid
                                                            amount</p>
                                                        <p className="mr-3 text-2xl font-semibold text-gray-900">${item.totalPrice}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {
                                                        item.orderItems.map((orderItem,index)=> <div key={index} className="shrink-0">
                                                            <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={orderItem && orderItem.product && orderItem.product.imageUrl } alt="orderItem"/>
                                                        </div>)
                                                    }
                                                </div>
                                                <div className="flex gap-5">
                                                    <button
                                                        className="disabled:opacity-50 mt-5 mr-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                                        {
                                                            item.isProcessing ? "Order is Processing" : "Order is Delivered"
                                                        }
                                                    </button>
                                                    <button
                                                        onClick={()=>router.push(`/orders/${item._id}`)}
                                                        className="mt-5 mr-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                                        View order detail
                                                    </button>
                                                </div>
                                            </li>
                                            )
                                        }
                                    </ul>
                                    : null
                            }</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}