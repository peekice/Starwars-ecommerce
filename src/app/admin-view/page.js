'use client'


import {useContext, useEffect} from "react";
import {GlobalContext} from "@/context";
import {getAllOrdersAdmin, updateOrder} from "@/services/order";

export default function AdminView(){

    const {allOrderAdmin, setAllOrderAdmin, user} = useContext(GlobalContext);

    async function extractAllOrders(){
        const res = await getAllOrdersAdmin();

        if(res.success){
            setAllOrderAdmin(res.data && res.data.length ? res.data.filter(item=>item.user._id !== user?._id):[]);
        }
    }

    useEffect(()=>{
        extractAllOrders();
    },[user])

    async function handleUpdateOrder(item){
        const res = await updateOrder({
            ...item,
            isProcessing : false
        })

        if(res.success){
            extractAllOrders();
        }
    }

    return(
        <section>
            <div className="mx-auto px-4 sm:px-6 lg;px-8">
                <div>
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                        <div className="flow-root">{
                            allOrderAdmin&& allOrderAdmin.length ?
                                <ul className="flex flex-col gap-4">
                                    {
                                        allOrderAdmin.map(item =>
                                            <li key={item.id}
                                                className="bg-gray-50 shadow p-5 flex flex-col space-y-3 py-6 text-left">
                                                <div className="flex">
                                                    <h1 className="font-bold text-lg mb-3 flex-1">#order: {item._id}</h1>
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">User
                                                                Name
                                                                :</p>
                                                            <p className=" text-sm font-semibold text-gray-900">{item.user.name}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">User
                                                                Email
                                                                :</p>
                                                            <p className=" text-sm font-semibold text-gray-900">{item.user.email}</p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">Total paid amount:
                                                                :</p>
                                                            <p className=" text-sm font-semibold text-gray-900">${item.totalPrice}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {
                                                        item.orderItems.map((orderItem, index) => <div key={index}
                                                                                                       className="shrink-0">
                                                            <img
                                                                className="h-24 w-24 max-w-full rounded-lg object-cover"
                                                                src={orderItem && orderItem.product && orderItem.product.imageUrl}
                                                                alt="orderItem"/>
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
                                                        onClick={()=>handleUpdateOrder(item)}
                                                        disabled={!item.isProcessing}
                                                        className="disabled:opacity-50 mt-5 mr-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                                        Update Order
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
        </section>
    )
}