import Cookies from "js-cookie";


export const addNewProduct = async (formData)=>{
    try {
        const response = await fetch('/api/admin/add-product',{
            method : "POST",
            headers : {
                'content-type' : 'application',
                Authorization : `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData)
        });

        const finalData = await response.json();
        return finalData
    }
    catch (error){
        console.log(error);
    }
}

export const getAllAdminProduct = async ()=>{
    try{
        const res = await fetch('https://starwars-ecommerce.vercel.app/api/admin/all-products',{
            method : 'GET',
            cache : 'no-cache'
        })

        const data = await res.json()
        return data
    }
    catch (error){
        console.log(error)
    }
}