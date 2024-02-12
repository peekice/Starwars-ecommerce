import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Joi from "joi";
import Cart from "@/models/cart";


export const dynamic = "force-dynamic";

const AddToCart = Joi.object({
    userID : Joi.string().required(),
    productID : Joi.string().required()
})

export async function POST(req){
    try {
        await connectToDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const data = await req.json();
            const {productID , userID} = data;

            const { error } = AddToCart.validate({ userID, productID });


            if (error) {
                return NextResponse.json({
                    success: false,
                    message: error.details[0]
                })
            }

            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID: productID,
                userID: userID,
            });

            if(isCurrentCartItemAlreadyExists.length !== 0){
                return NextResponse.json({
                        success: false,
                        message: 'Product is Already in cart'
                    }
                )
            }

            const saveProductToCart = await Cart.create(data);

            if(saveProductToCart){
                return NextResponse.json({
                        success: true,
                        message: 'Product is added in cart'
                    }
                )
            }
            else{
                return NextResponse.json({
                        success: false,
                        message: 'Failed to add product to cart'
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