import {NextResponse} from "next/server";
import AuthUser from "@/middleware/AuthUser";

const stripe = require('stripe')('sk_test_51OlbEgGmbckm5SEdGZbUjdd1fcG2p5Pd67Rx0RXt7aTImLnmpKiCWyfBFDbE5kKjvz7aYwFwYNv6qhQfw6sHbLyR00e5IYONt8')
const deployLink = 'https://starwars-ecommerce.vercel.app/checkout'
const localLink = 'http://localhost:3000/checkout'


export const dynamic = 'force-dynamic'

export async function POST(req) {
    try {

        const isAuthUser = await AuthUser(req);

        if (isAuthUser) {
            const res = await req.json();

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: res,
                mode: "payment",
                success_url: deployLink + '?status=success',
                cancel_url: deployLink+ '?status=cancel',
            });

            return NextResponse.json({
                    success: true,
                    id: session.id
                }
            );
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
                status: 500,
                success: false,
                message: 'Something went wrong try again later'
            }
        );
    }
}