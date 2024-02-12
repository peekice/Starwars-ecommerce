import {NextResponse} from "next/server";
import connectToDB from "@/database";
import Product from "@/models/product";
import AuthUser from "@/middleware/AuthUser";


export const dynamic = 'force-dynamic';

export async function PUT(req) {
    try {

        await connectToDB();
        const isAuthUser = await AuthUser(req)

        if (isAuthUser?.role === "admin") {
            const extractData = await req.json();

            const {_id, name, price, description, category, deliveryIngo, onSale, priceDrop, imageUrl} = extractData;

            const updateProduct = await Product.findOneAndUpdate({
                    _id: _id
                },
                {name, price, description, category, deliveryIngo, onSale, priceDrop, imageUrl},
                {new: true});

            if (updateProduct) {
                return NextResponse.json({
                        success: true,
                        message: 'Product update successfully'
                    }
                )
            } else {
                return NextResponse.json({
                        success: false,
                        message: 'Failed to update product try again later'
                    }
                )
            }
        } else {
            return NextResponse.json({
                success: false,
                message: 'You are not authorized'
            })
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