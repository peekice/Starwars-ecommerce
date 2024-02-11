import CommonListing from "@/components/CommonListing";
import {productByCategory} from "@/services/product";


export default async function LightsaberAllProducts(){

    const getAllProduct = await productByCategory('lightsaber');

    return <CommonListing data={getAllProduct && getAllProduct.data}/>
}