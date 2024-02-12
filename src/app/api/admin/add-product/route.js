import connectToDB from "@/database";
import {NextResponse} from "next/server";
import Joi from "joi";
import Product from "@/models/product";
import AuthUser from "@/middleware/AuthUser";

const AddNewProductSchema = Joi.object({
    name: Joi.string().required(),
    category: String,
    description: Joi.string().required(),
    price: Joi.number().required(),
    deliveryInfo: Joi.string().required(),
    onSale: Joi.string().required(),
    priceDrop: Joi.number().required(),
    imageUrl: Joi.string().required(),
})

export const dynamic = 'force-dynamic';

export async function POST(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser?.role === "admin") {
            const extractData = await req.json()

            const {name, description, category, price, deliveryInfo, onSale, priceDrop, imageUrl} = extractData;

            const {error} = AddNewProductSchema.validate({
                name,
                description,
                category,
                price,
                deliveryInfo,
                onSale,
                priceDrop,
                imageUrl
            })

            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0]
                })
            }

            const newlyCreatedProduct = await Product.create(extractData);

            if (newlyCreatedProduct) {
                return NextResponse.json({
                    success: true,
                    message: 'Product add successfully'
                })
            } else {
                return NextResponse.json({
                    success: false,
                    message: 'Failed to add product, Please try again '
                })
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