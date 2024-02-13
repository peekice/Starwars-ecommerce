import Cookies from "js-cookie";


export const addNewAddress = async (formData)=>{
    try {
        const res = await fetch('/api/address/add-new-address',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        });

        const data = await res.json();
        return data;

    }
    catch (error){
        console.log(error)
    }
}

export const deleteAddress = async (id)=>{
    try {
        const res = await fetch(`/api/address/deleted-address?id=${id}`,{
            method : 'DELETE',
            headers : {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        });

        const data = await res.json();
        return data;
    }
    catch (error){
        console.log(error)
    }
}

export const updateAddress = async (formData)=>{
    try {
        const res = await fetch('/api/address/update-address',{
            method : 'PUT',
            headers : {
                'Content-type' : 'application/json',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        });

        const data = await res.json();
        return data;
    }
    catch (error){
        console.log(error)
    }
}

export const getAllAddress = async (id)=>{
    try {
        const res = await fetch(`/api/address/get-all-address?id=${id}`,{
            method : 'GET',
            headers : {
                Authorization : `Bearer ${Cookies.get('token')}`
            },
        });

        const data = await res.json();
        return data;
    }
    catch (error){
        console.log(error)
    }
}