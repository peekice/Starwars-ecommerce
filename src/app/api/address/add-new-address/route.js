import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Joi from "joi";
import Address from "@/models/address";

const AddNewAddress = Joi.object({
    fullName : Joi.string().required(),
    address : Joi.string().required(),
    star : Joi.string().required(),
    userID : Joi.string().required(),
})

export const dynamic = 'force-dynamic'


export async function POST(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser){
            const data = await req.json();

            const {fullName,address,star,userID} = data;

            const {error} = AddNewAddress.validate({fullName,address,star,userID} )

            if(error){
                return NextResponse.json({
                        success: false,
                        message: error.details[0].message
                    }
                )
            }

            const newAddress = await Address.create(data);

            if(newAddress){
                return NextResponse.json({
                        success: true,
                        message: 'Add new address successfully'
                    }
                )
            }
            else{
                return NextResponse.json({
                        success: false,
                        message: 'Failed to add new address'
                    }
                )
            }

        }
        else {
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
