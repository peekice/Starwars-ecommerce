import CommonListing from "@/components/CommonListing";
import {getAllAdminProduct} from "@/services/product";


export default async function AdminAllProduct(){

    const allAdminProducts = await getAllAdminProduct();

    console.log(allAdminProducts)

    return <CommonListing data={allAdminProducts && allAdminProducts.data}/>
}