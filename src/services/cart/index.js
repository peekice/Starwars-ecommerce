import Cookies from "js-cookie";


export const addToCart = async (formData)=>{
    try {
        const res = await fetch('/api/cart/add-to-cart',{
            method : 'POST',
            headers : {
                'content-type' :'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        });

        const data = await res.json();
        return data;

    }
    catch (error) {
        console.log(error);
    }
}

export const getAllCartItems = async (id)=>{
    try {
        const res = await fetch(`/api/cart/all-cart-items?id=${id}`,{
            method : 'GET',
            headers : {
                'content-type' :'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        });

        const data = await res.json();
        return data;

    }
    catch (error) {
        console.log(error);
    }
}

export const deleteFromCart = async (id)=>{
    try {
        const res = await fetch(`/api/cart/delete-from-cart?id=${id}`,{
            method : 'DELETE',
            headers : {
                'content-type' :'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            }
        });

        const data = await res.json();
        return data;

    }
    catch (error) {
        console.log(error);
    }
}