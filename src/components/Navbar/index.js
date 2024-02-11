'use client'

import {Fragment, useContext, useEffect} from "react";
import {navOptions, adminNavOptions} from "@/utils";
import {GlobalContext} from "@/context";
import Cookies from "js-cookie";
import {usePathname, useRouter} from "next/navigation";


const styles = {
    button: 'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white',
};

function NavItems(){

    const router = useRouter()
    const pathName = usePathname()
    const isAdminView = pathName.includes('admin-view')

    return (
        <div className="items-center justify-between w-full md:flex md:w-auto" id="nav-items">
            <ul className="flex flex-col p-4 md:p-4 mt-4 font-medium border border-gray-100 rounded md:flex-row md:space-x-8 md:mt-0 md:border-0">
                {
                    isAdminView ? adminNavOptions.map((item) => (
                        <li onClick={()=> router.push(item.path)} className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0" key={item.id}>
                            {item.label}
                        </li>)) :navOptions.map((item) => (
                        <li onClick={()=> router.push(item.path)} className="cursor-pointer block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0" key={item.id}>
                            {item.label}
                        </li>))
                }
            </ul>
        </div>
    )
}

export default function Navbar(){

    const {user, isAuthUser, setIsAuthUser, setUser, currentUpdateProduct, setCurrentUpdateProduct} = useContext(GlobalContext)
    const router = useRouter()
    const pathName = usePathname()


    useEffect(() => {
        if(pathName !== '/admin-view/add-product' && currentUpdateProduct !== null) setCurrentUpdateProduct(null);
    }, [pathName]);

    function handleLogout(){
        setIsAuthUser(false)
        setUser(null)
        Cookies.remove('token')
        localStorage.clear()
        router.push('/')
    }

    const isAdminView = pathName.includes('admin-view')

    return(
        <nav className="bg-stwgold fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center cursor-pointer">
                   <span className="self-center text-xl font-normal whitespace-nowrap">
                       Starwars Ecommerce
                   </span>
                </div>
                <div className="flex md:order-2 gap-2">
                    {
                        !isAdminView && isAuthUser ?
                            <Fragment>
                                <button className={styles.button}>Account</button>
                                <button className={styles.button}>Cart</button>
                            </Fragment>
                            : null}
                    {
                        user?.role == 'admin'?
                            isAdminView ? <button onClick={()=>router.push("/")} className={styles.button}>Client View</button>
                                :<button onClick={()=>router.push("/admin-view")} className={styles.button}>Admin View</button>
                            :null
                    }
                    {
                        isAuthUser ? <button onClick={handleLogout} className={styles.button}>Logout</button>
                            :<button onClick={()=> router.push('/login')} className={styles.button}>Login</button>
                    }
                </div>
                <NavItems/>
            </div>
        </nav>
    )
}