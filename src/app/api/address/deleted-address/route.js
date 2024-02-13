import {NextResponse} from "next/server";
import connectToDB from "@/database";
import AuthUser from "@/middleware/AuthUser";
import Address from "@/models/address";


export const dynamic = 'force-dynamic'

export async function DELETE(req){
    try{
        await connectToDB();

        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');

        if(!id){
            return NextResponse.json({
                    success: false,
                    message: 'Address ID is required'
                }
            )
        }

        const isAuthUser = await AuthUser(req);

        if(isAuthUser){
            const deleteAddress = await Address.findByIdAndDelete(id)

            if(deleteAddress){
                return NextResponse.json({
                        success: true,
                        message: 'Delete address successfully'
                    }
                )
            }
            else {
                return NextResponse.json({
                        success: false,
                        message: 'Failed to delete address'
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