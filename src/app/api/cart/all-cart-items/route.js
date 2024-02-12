import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Cart from "@/models/cart";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get("id");

            if (!id) {
                return NextResponse.json({
                        success: false,
                        message: 'Please Login'
                    }
                )
            }

            const extractAllCartItems = await Cart.find({userID: id}).populate(
                "productID"
            );

            if (extractAllCartItems) {
                return NextResponse.json({
                        success: true,
                        data: extractAllCartItems
                    }
                )
            } else {
                return NextResponse.json({
                        success: false,
                        status: 204,
                        message: 'No cart item found'
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