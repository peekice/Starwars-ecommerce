'use client'

import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "@/context";
import {getAllAdminProduct} from "@/services/product";
import {useRouter} from "next/navigation";

export default function Home() {

    const {isAuthUser} = useContext(GlobalContext);

    const [product, setProduct] = useState([]);
    const router = useRouter();

    async function getProductList() {
        const res = await getAllAdminProduct();

        if (res) {
            setProduct(res.data)
        }
    }

    useEffect(() => {
        getProductList();
    }, [])


    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <section className="">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 sm:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-screen-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">Best
                            Starwars Collection</h1>
                        <p className="max-w-full-xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">Whether
                            you're a Rebel on the run or a Sith Lord in training, find your destiny with Star Wars
                            merchandise from Starwars Ecommerce.</p>
                        <button
                            type="button"
                            onClick={() => router.push("/product/listing/all-products")}
                            className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                        >
                            Get Started
                        </button>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/starwars-ecommerce.appspot.com/o/starwars-ecommerce%2Fstw-img.png?alt=media&token=4ee035b5-949d-4da3-bf5c-5cc55e344f7c"
                            alt="Header Image"/>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
                        <div className="grid p-6 bg-gray-100 rounded place-content-center sm:p-8">
                            <div className="max-w-md mx-auto text-center lg:text-left">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Starwars Sale
                                        Collection</h2>
                                </div>
                                <button
                                    onClick={() => router.push("/product/listing/all-products")}
                                    className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Shop
                                    All
                                </button>
                            </div>
                        </div>
                        <div className="lg:col-span-2 lg:py-8">
                            <ul className="grid grid-cols-2 gap-4">
                                {
                                    product && product.length ?
                                        product.filter(item => item.onSale === 'yes').splice(0, 2).map(item =>
                                            <li
                                                onClick={() => router.push(`/product/${item._id}`)}
                                                className="cursor-pointer"
                                                key={item._id}>
                                                <div>
                                                    <img className="object-cover w-full rounded aspect-square"
                                                         src={item.imageUrl} alt="sale product"/>
                                                </div>
                                                <div className="mt-3">
                                                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                                                    <p className="mt-1 text-sm text-gray-800">${item.price}
                                                        <span className="text-red-700">{`(-${item.priceDrop}%)`}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        )
                                        : null
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-gray-950 sm:text-3xl">SHOP BY CATEGORY</h2>
                    </div>
                    <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
                        <li onClick={() => router.push("/product/listing/starship")}>
                            <div className="relative block group">
                                <img className="object-cover w-full aspect-square" src="https://firebasestorage.googleapis.com/v0/b/starwars-ecommerce.appspot.com/o/starwars-ecommerce%2FRedFive_X-wing_SWB.webp?alt=media&token=dac6b543-d5b6-4dbb-957a-dc797a82ddc0" alt="starship"/>
                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-xl font-medium">Star Ship</h3>
                                    <button
                                        className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Shop
                                        Now
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li onClick={() => router.push("/product/listing/lightsaber")}>
                            <div className="relative block group">
                                <img className="object-cover w-full aspect-square" src="https://firebasestorage.googleapis.com/v0/b/starwars-ecommerce.appspot.com/o/starwars-ecommerce%2Fexiled.jpg?alt=media&token=d7bbf65d-5394-4079-adc2-59d361c41e07" alt="Light Saber"/>
                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-xl font-medium">Light Saber</h3>
                                    <button
                                        className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Shop
                                        Now
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li onClick={() => router.push("/product/listing/helmet")}>
                            <div className="relative block group">
                                <img className="object-cover w-full aspect-square" src="https://firebasestorage.googleapis.com/v0/b/starwars-ecommerce.appspot.com/o/starwars-ecommerce%2F03ac406304c145fbbf92755d2cb85b4b_Original.jpg?alt=media&token=ea51f360-d441-4e87-8583-fa227238c69d" alt="helmet"/>
                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-xl font-medium">Helmet</h3>
                                    <button
                                        className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Shop
                                        Now
                                    </button>
                                </div>
                            </div>
                        </li>
                        <li onClick={() => router.push("/product/listing/droid")}>
                            <div className="relative block group">
                                <img className="object-cover w-full aspect-square" src="https://firebasestorage.googleapis.com/v0/b/starwars-ecommerce.appspot.com/o/starwars-ecommerce%2Fs-l1600.jpg?alt=media&token=62c5b126-1099-47d0-8512-018925724a68" alt="droid"/>
                                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                                    <h3 className="text-xl font-medium">Droid</h3>
                                    <button
                                        className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">Shop
                                        Now
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    );
}