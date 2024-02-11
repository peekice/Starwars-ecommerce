'use client'

import {usePathname, useRouter} from "next/navigation";
import {useContext} from "react";
import {GlobalContext} from "@/context";
import {deleteProduct} from "@/services/product";
import {toast} from "react-toastify";

export default function ProductButton({item}) {

    const pathName = usePathname();
    const isAdminView = pathName.includes('admin-view');
    const router = useRouter();

    const {setCurrentUpdateProduct} = useContext(GlobalContext);

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

    return isAdminView ? <>
            <button onClick={()=>{
                setCurrentUpdateProduct(item);
                router.push('/admin-view/add-product');
            }} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Update</button>
            <button onClick={()=> handleDeleteProduct(item)} className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Delete</button>
        </>
        : <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Add To Cart</button>
        </>
}