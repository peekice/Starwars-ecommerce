'use client'


import {adminAddProductFormControls, loginFormControls} from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";

export default function AdminAddNewProduct() {

    function handleImage() {

    }

    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div className="flex flex-col items-start justify-start p-10 mt-4 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-6 ml-0 space-y-8">
                    <input accept="image/" max="100000" type="file" onChange={handleImage}/>
                    {adminAddProductFormControls.map(controlItem =>
                        controlItem.componentType === 'input' ?
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                            />
                            : controlItem.componentType === 'select' ?
                                <SelectComponent
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    option={controlItem.options}
                                /> : null
                    )
                    }
                    <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium">Add Product</button>
                </div>
            </div>
        </div>
    )
}