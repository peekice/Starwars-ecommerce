'use client'
import {loginFormControls} from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import {useRouter} from "next/navigation";
import {useContext, useEffect, useState} from "react";
import {login} from "@/services/login";
import {GlobalContext} from "@/context";
import Cookies from "js-cookie";
import Notification from "@/components/Notification";
import {toast} from "react-toastify";


const initialFormdata = {
    email : '',
    password : ''
};


export default function Login() {

    const [formData, serFormData] = useState(initialFormdata);

    const {isAuthUser, setIsAuthUser, user, setUser} = useContext(GlobalContext)

    const router = useRouter();


    function isFormValid() {
        return formData && formData.email && formData.email.trim() !== '' && formData.password && formData.password.trim() !== '' ? true : false;
    }

    async function handleLogin(){
        const res =  await login(formData)

        if(res.success){
            toast.success(res.message,{
                position: "top-right"
            });
            setIsAuthUser(true);
            setUser(res?.finalData.user);
            serFormData(initialFormdata);
            Cookies.set('token',res?.finalData.token);
            localStorage.setItem('user', JSON.stringify(res?.finalData?.user));
        }
        else{
            toast.error(res.message,{
                position: "top-right"
            });
            setIsAuthUser(false);
        }
    }

    useEffect(()=>{
        if(isAuthUser) router.push("/")
    }, [isAuthUser])

    return (
        <div className="bg-white relative">
            <div
                className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-cole justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div
                            className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center">
                                Login
                            </p>
                            <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                {loginFormControls.map(controlItem =>
                                    <InputComponent
                                        type={controlItem.type}
                                        placeholder={controlItem.placeholder}
                                        label={controlItem.label}
                                        value={formData[controlItem.id]}
                                        onChange={(event)=>{
                                            serFormData({
                                                ...formData,
                                                [controlItem.id] : event.target.value
                                            })
                                        }}
                                    />
                                )
                                }
                                <button
                                    className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide" disabled={!isFormValid()} onClick={handleLogin}>Login
                                </button>
                                <div className="flex flex-col gap-2">
                                    <p>Don't Have Account ?</p>
                                    <button
                                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide" onClick={() => router.push("/register")}>Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification/>
        </div>
    )
}
