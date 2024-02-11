'use client'


import {adminAddProductFormControls, firebaseConfig, firebaseStorageUrl} from "@/utils";
import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import {initializeApp} from 'firebase/app'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {useContext, useEffect, useState} from "react";
import {addNewProduct, updateProduct} from "@/services/product";
import {toast} from "react-toastify";
import Notification from "@/components/Notification";
import {useRouter} from "next/navigation";
import {GlobalContext} from "@/context";


const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageUrl)

const createUniqueFileName = (file) => {
    const timeStamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 12);

    return `${file.name}-${timeStamp}-${randomString}`;
}

async function helperForUploadingImageToFirebase(file) {
    const getFileName = createUniqueFileName(file);
    const storageReference = ref(storage, `starwars-ecommerce/${getFileName}`)
    const uploadImage = uploadBytesResumable(storageReference, file)

    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot) => {
        }, (error) => {
            console.log(error);
            reject(error);
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then(downloadUrl => resolve(downloadUrl)).catch(error => reject(error))
        })
    })
}

const initialFormData = {
    name: "",
    price: 0,
    description: '',
    category: 'starship',
    deliveryInfo: '',
    onSale: 'no',
    imageUrl: '',
    priceDrop: '',
}

export default function AdminAddNewProduct() {

    const [formData, setFormData] = useState(initialFormData);
    const router = useRouter();

    const {currentUpdateProduct, setCurrentUpdateProduct} = useContext(GlobalContext);

    useEffect(() => {
        if (currentUpdateProduct !== null) {
            setFormData(currentUpdateProduct)
        }
    }, [currentUpdateProduct]);

    async function handleImage(event) {
        const extractImageUrl = await helperForUploadingImageToFirebase(event.target.files[0]);

        if (extractImageUrl !== '') {
            setFormData({
                    ...formData,
                    imageUrl: extractImageUrl
                }
            )
        }
    }

    async function handleAddProduct() {
        const res = currentUpdateProduct !== null ? await updateProduct(formData) : await addNewProduct(formData);

        if (res.success) {
            toast.success(res.message, {
                position: "top-right"
            });
            setFormData(initialFormData);
            setCurrentUpdateProduct(null);
            let delayInMilliseconds = 1000;

            setTimeout(function() {
                router.push('/admin-view/all-products')
            }, delayInMilliseconds);

        } else {
            toast.error(res.message, {
                position: "top-right"
            });
        }

    }

    return (
        <div className="w-full mt-5 mr-0 mb-0 ml-0 relative">
            <div
                className="flex flex-col items-start justify-start p-10 mt-4 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mt-6 mr-0 mb-6 ml-0 space-y-8">
                    <input accept="image/" max="100000" type="file" onChange={handleImage}/>
                    {adminAddProductFormControls.map(controlItem =>
                        controlItem.componentType === 'input' ?
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: event.target.value
                                    })
                                }}
                            />
                            : controlItem.componentType === 'select' ?
                                <SelectComponent
                                    type={controlItem.type}
                                    placeholder={controlItem.placeholder}
                                    label={controlItem.label}
                                    option={controlItem.options}
                                    value={formData[controlItem.id]}
                                    onChange={(event) => {
                                        setFormData({
                                            ...formData,
                                            [controlItem.id]: event.target.value
                                        })
                                    }}
                                /> : null
                    )
                    }
                    <button onClick={handleAddProduct}
                            className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium">
                        {currentUpdateProduct !== null ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </div>
            <Notification/>
        </div>
    )
}