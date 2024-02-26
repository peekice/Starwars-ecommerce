import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Product from "@/models/product";
import Order from "@/models/order";


export const dynamic = 'force-dynamic'


export async function GET(req){
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === "admin") {
            const getAllOrders = await Order.find({}).populate('orderItems.product').populate('user');

            if(getAllOrders){
                return NextResponse.json({
                    success: true,
                    data : getAllOrders
                })
            } else {
                return NextResponse.json({
                        success: false,
                        message: 'Failed to get all orders try again later'
                    }
                )
            }

        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authorized'
            })
        }
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({
                success: false,
                message: 'Something went wrong try again later'
            }
        )
    }
}