'use client'

import {usePathname} from "next/navigation";

export default function ProductButton() {

    const pathName = usePathname();
    const isAdminView = pathName.includes('admin-view');

    return isAdminView ? <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Update</button>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Delete</button>
        </>
        : <>
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs text-white font-medium uppercase">Add To Cart</button>
        </>
}