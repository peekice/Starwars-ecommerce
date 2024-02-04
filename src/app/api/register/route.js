import connectToDB from "@/database";
import Joi from "joi";
import {NextResponse} from "next/server";
import User from "@/models/user";
const bcryptjs = require('bcryptjs');


const schema = Joi.object({
    name : Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),
    role : Joi.string().required(),
})

export const dynamic = 'force-dynamic';

export async function POST(req){
    await connectToDB();

    const {name,email,password,role} = await req.json();

    const {error} = schema.validate({name,email,password,role})

    if(error){
        return NextResponse.json({
            success : false,
            message : email.details[0]
        })
    }

    try {
        const isUserAlreadyExist = await User.findOne({email});

        if(isUserAlreadyExist){
            return NextResponse.json({
                success : false,
                message : 'User is already exist please use another email'
            }
            )
        }
        else {
            const hashPassword = await bcryptjs.hash(password, 8);

            const newCreatedUser = await User.create({name,email,password : hashPassword,role})

            if(newCreatedUser){
                return NextResponse.json({
                    success : true,
                    message : 'Create user successfully!!!'
                })
            }
        }
    }
    catch (error){
        console.log('Error is new user registration')
        return NextResponse.json({
            success : false,
            message : `Something went wrong try again later ${error}`
        }
        )
    }
}