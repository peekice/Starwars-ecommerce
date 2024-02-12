import Cookies from "js-cookie";


export const addNewProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/add-product', {
            method: "POST",
            headers: {
                'content-type': 'application',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        });

        const finalData = await response.json();
        return finalData
    } catch (error) {
        console.log(error);
    }
}

export const getAllAdminProduct = async () => {
    try {
        const res = await fetch('https://starwars-ecommerce.vercel.app/api/admin/all-products', {
            method: 'GET',
            cache: 'no-cache'
        })

        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateProduct = async (formData) => {
    try {
        const res = await fetch('/api/admin/update-product', {
            method: 'PUT',
            headers: {
                'content-type': 'application',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body : JSON.stringify(formData),
        });

        const data = await res.json();

        return data;

    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id)=>{
    try {
        const res = await fetch(`/api/admin/delete-product?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = res.json();

        return data;
    }
    catch (error) {
        console.log(error)
    }
}

export const productByCategory = async (id)=>{
    try {
        const res = await fetch(`https://starwars-ecommerce.vercel.app/api/admin/product-by-category?id=${id}`,{
            method : 'GET',
            cache: 'no-cache'
        });

        const data = res.json();
        return data;
    }
    catch (error) {
        console.log(error)
    }
}

export const productById = async (id)=>{
    try {
        const res = await fetch(`https://starwars-ecommerce.vercel.app/api/admin/product-by-id?id=${id}`,{
            method : 'GET',
            cache: 'no-cache'
        });

        const data = res.json();
        return data;
    }
    catch (error) {
        console.log(error)
    }
}