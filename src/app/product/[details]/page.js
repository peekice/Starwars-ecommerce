import {productById} from "@/services/product";
import CommonDetails from "@/components/CommonDetails";


export default async function ProductDetails({params}){

    const productDetail = await productById(params.details)

    return <CommonDetails item={productDetail && productDetail.data}/>
}