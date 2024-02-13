import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";


export const dynamic = 'force-dynamic'

export async function PUT(req) {
    try {
        await connectToDB();

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const data = await req.json();
            const {_id, fullName, address, star} = data

            const updateAddress = await Address.findOneAndUpdate({
                _id: _id,
            }, {
                fullName: fullName,
                address: address,
                star: star
            }, {new: true})

            if(updateAddress){
                return NextResponse.json({
                        success: true,
                        message: 'Update address successfully'
                    }
                )
            }
            else {
                return NextResponse.json({
                        success: false,
                        message: 'Failed to update address'
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