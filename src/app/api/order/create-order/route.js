import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Order from "@/models/order";
import Cart from "@/models/cart";


export const dynamic = "force-dynamic";


export async function POST(req){
    try {
        await connectToDB();
        const isAuthUser = AuthUser(req)

        if(isAuthUser){
            const data = await req.json();
            const {user} =data;

            const saveNewOrder = await Order.create(data);

            if(saveNewOrder){
                await Cart.deleteMany({userID : user});
                return NextResponse.json({
                        success: true,
                        message: 'Created order successfully'
                    }
                )
            }
            else{
                return NextResponse.json({
                        success: false,
                        message: 'Failed to create order please try again'
                    }
                )
            }
        }
        else{
            return NextResponse.json({
                    success: false,
                    message: 'You are not authenticated'
                }
            )
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