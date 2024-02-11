import {NextResponse} from "next/server";
import connectToDB from "@/database";
import Product from "@/models/product";


export const dynamic = 'force-dynamic';

export async function PUT(req) {
    try {

        await connectToDB();

        const extractData = await req.json();

        const {_id, name, price, description, category, deliveryIngo, onSale, priceDrop, imageUrl} = extractData;

        const updateProduct = await Product.findOneAndUpdate({
            _id : _id},
            {name, price, description, category, deliveryIngo, onSale, priceDrop, imageUrl},
            {new:true});

        if (updateProduct){
            return NextResponse.json({
                    success: true,
                    message: 'Product update successfully'
                }
            )
        }
        else {
            return NextResponse.json({
                    success: false,
                    message: 'Failed to update product try again later'
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