'use client'

import {registrationFormControls} from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import {useState} from "react";
import {registerNewUser} from "@/services/register";
import Notification from "@/components/Notification";
import {toast} from "react-toastify";
import {useRouter} from "next/navigation";

const isRegistered = false

const initialState = {
    name: '',
    email: '',
    password: '',
    role: 'customer',
}

export default function Register() {

    const [formData, setFormData] = useState(initialState)
    const  router = useRouter()

    function isFormValid() {
        return formData && formData.name && formData.name.trim() !== '' && formData.email && formData.email.trim() !== '' && formData.password && formData.password.trim() !== '' ? true : false;
    }


    async function handleRegisterOnSubmit(){
        const data = await registerNewUser(formData)
        if(data.success){
            toast.success(data.message,{
                position: "top-right"
            });

            let delayInMilliseconds = 1000;

            setTimeout(function() {
                router.push('/login')
            }, delayInMilliseconds);

        }
        else{
            toast.error(data.message,{
                position: "top-right"
            });
        }
    }



    return (
        <div className="bg-white relative">
            <div
                className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-cole justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div
                            className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center">{
                                isRegistered ? "Registration Successful !!!" : "Sign Up"
                            }</p>
                            {
                                isRegistered ? <button
                                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">Login</button>
                                    : <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                        {registrationFormControls.map(controlItem =>
                                            <InputComponent
                                                type={controlItem.type}
                                                placeholder={controlItem.placeholder}
                                                label={controlItem.label}
                                                onChange={(event) =>
                                                    setFormData({
                                                        ...formData,
                                                        [controlItem.id]: event.target.value
                                                    })}
                                                value={formData[controlItem.id]}
                                            />
                                        )
                                        }
                                        <button
                                            className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
                                            disabled={!isFormValid()}
                                            onClick={handleRegisterOnSubmit}>
                                            Register
                                        </button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Notification/>
        </div>
    )
}