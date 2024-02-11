import CommonListing from "@/components/CommonListing";
import {productByCategory} from "@/services/product";


export default async function StarShipAllProducts(){

    const getAllProduct = await productByCategory('starship');

    return <CommonListing data={getAllProduct && getAllProduct.data}/>
}