import connectToDB from "@/database";
import Order from "@/models/order";
import {NextResponse} from "next/server";
import AuthUser from "@/middleware/AuthUser";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = AuthUser(req)

        if (isAuthUser) {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('id');

            if(!id){
                return NextResponse.json({
                        success: false,
                        message: 'Product ID is required'
                    }
                )
            }

            const extractOrderDetails = await Order.findById(id).populate('orderItems.product');

            if (extractOrderDetails){
                return NextResponse.json({
                        success: true,
                        data : extractAllOrder
                    }
                )
            }
            else{
                return NextResponse.json({
                        success: false,
                        message: 'Failed to get order detail please try again'
                    }
                )
            }


        } else {
            return NextResponse.json({
                    success: false,
                    message: 'You are not authenticated'
                }
            )
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
                success: false,
                message: 'Something went wrong try again later'
            }
        )
    }

}