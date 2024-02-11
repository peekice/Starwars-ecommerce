import CommonListing from "@/components/CommonListing";
import {productByCategory} from "@/services/product";


export default async function HelmetAllProducts(){

    const getAllProduct = await productByCategory('helmet');

    return <CommonListing data={getAllProduct && getAllProduct.data}/>
}