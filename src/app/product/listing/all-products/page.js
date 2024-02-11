import CommonListing from "@/components/CommonListing";
import {getAllAdminProduct} from "@/services/product";

export default async function AllProducts() {

    const getAllProducts = await getAllAdminProduct();

    return <CommonListing data={getAllProducts && getAllProducts.data}/>
}