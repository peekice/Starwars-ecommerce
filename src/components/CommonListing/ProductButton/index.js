'use client'

import {usePathname, useRouter} from "next/navigation";
import {useContext} from "react";
import {GlobalContext} from "@/context";
import {deleteProduct} from "@/services/product";
import {toast} from "react-toastify";
import {addToCart} from "@/services/cart";

export default function ProductButton({item}) {

    const pathName = usePathname();
    const isAdminView = pathName.includes('admin-view');
    const router = useRouter();

    const {setCurrentUpdateProduct,user,showCartModal, setShowCartModal} = useContext(GlobalContext);

    async function handleDeleteProduct(item){

        const res = await deleteProduct(item._id);

        if (res.success) {
            toast.success(res.message, {
                position: "top-right"
            });
            router.refresh();
        }
        else {
            toast.error(res.message, {
                position: "top-right"
            });
        }

    }

    async function handleAddToCart(item){
        const res = await addToCart({productID : item._id, userID : user._id})

        if (res.success) {
            toast.success(res.message, {
                position: "top-right"
            });
            setShowCartModal(true);
        }
        else {
            toast.error(res.message, {
                position: "top-right"
            });
            setShowCartModal(true);
        }

    }

    return isAdminView ? <>
            <button onClick={()=>{
                setCurrentUpdateProduct(item);
                router.push('/admin-view/add-product');
            }} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Update</button>
            <button onClick={()=> handleDeleteProduct(item)} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Delete</button>
        </>
        : <>
            <button onClick={()=>handleAddToCart(item)} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Add To Cart</button>
        </>
}