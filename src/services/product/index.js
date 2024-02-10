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