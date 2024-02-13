'use client'

import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/context";
import {addNewAddressFormControls} from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import {addNewAddress, deleteAddress, getAllAddress, updateAddress} from "@/services/address";
import {toast} from "react-toastify";
import Notification from "@/components/Notification";
import {useRouter} from "next/navigation";
import {log} from "next/dist/server/typescript/utils";

export default function Account() {

    const {user, address, setAddress, addressFormData, setAddressFormData} = useContext(GlobalContext);

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [currentEditAddress, setCurrentEditAddress] = useState(null);


    async function extractAllAddress() {
        const res = await getAllAddress(user?._id);
        if (res.success) {
            setAddress(res.data)
        }
    }

    async function handleAddOrUpdateAddress() {
        const res = currentEditAddress !== null ? await updateAddress({
                ...addressFormData,
                _id: currentEditAddress,
            })
            : await addNewAddress({...addressFormData, userID: user?._id});

        if (res.success) {
            toast.success(res.message, {
                position: "top-right"
            });
            setAddressFormData({
                fullName: '',
                address: '',
                star: '',
            });
            extractAllAddress();
            setCurrentEditAddress(null);
        } else {
            toast.error(res.message, {
                position: "top-right"
            });
            setAddressFormData({
                fullName: '',
                address: '',
                star: '',
            });
        }
    }

    function handleUpdateAddress(getCurrentAddress) {
        setShowAddressForm(true);
        setAddressFormData({
            fullName: getCurrentAddress.fullName,
            address: getCurrentAddress.address,
            star: getCurrentAddress.star,
        });
        setCurrentEditAddress(getCurrentAddress._id);
    }

    async function handleDelete(getCurrentAddress) {

        console.log(getCurrentAddress?._id)

        const res = await deleteAddress(getCurrentAddress?._id);

        if (res.success) {

            toast.success(res.message, {
                position: "top-right"
            });
            extractAllAddress();
        } else {

            toast.error(getCurrentAddress, {
                position: "top-right"
            });
        }
    }

    useEffect(() => {
        if (user !== null) {
            extractAllAddress();
        }
    }, [user]);

    return (
        <section>
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left">{user?.name}</h4>
                            <p>{user?.email}</p>
                        </div>
                        <button
                            className="mt-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">View
                            Your Orders
                        </button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your Addresses</h1>
                            <div className="mt-4 flex flex-col gap-4">
                                {address && address.length ? address.map(item => <div className="border p-6"
                                                                                      key={item._id}>
                                    <p>Name : {item.fullName}</p>
                                    <p>Star : {item.star}</p>
                                    <p>Address : {item.address}</p>
                                    <button onClick={() => handleUpdateAddress(item)}
                                            className="mt-5 mr-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                        Update
                                    </button>
                                    <button onClick={() => handleDelete(item)}
                                            className="mt-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                        Delete
                                    </button>
                                </div>) : <p>No address found</p>}
                            </div>
                        </div>
                        <div className="mt-4">
                            <button onClick={() => setShowAddressForm(!showAddressForm)}
                                    className="mt-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                {showAddressForm ? "Hide form address" : "Add new address"}
                            </button>
                        </div>
                        {
                            showAddressForm ? <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                    {
                                        addNewAddressFormControls.map(controlItems =>
                                            <InputComponent
                                                type={controlItems.type}
                                                placeholder={controlItems.placeholder}
                                                label={controlItems.label}
                                                value={addressFormData[controlItems.id]}
                                                onChange={(event) => setAddressFormData({
                                                    ...addressFormData,
                                                    [controlItems.id]: event.target.value,
                                                })}
                                            />
                                        )
                                    }
                                </div>
                                <button onClick={handleAddOrUpdateAddress}
                                        className="mt-5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase text-white">
                                    Save
                                </button>
                            </div> : null}
                    </div>
                </div>
            </div>
            <Notification/>
        </section>
    )
}