import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        orderItems: [
            {
                qty: {type: Number, required: true},
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Products',
                },
            }
        ],
        shippingAddress: {
            fullName: {type: String, required: true},
            address: {type: String, required: true},
            star: {type: String, required: true},
        },
        paymentMethod: {type: String, required: true, default: "Stripe"},
        totalPrice: {type: Number, required: true},
        isPaid: {type: Boolean, required: true},
        paidAt: {type: Date, required: true},
        isProcessing: {type: Boolean, required: true}
    },{timestamps:true}
);


const Order = mongoose.models.Order || mongoose.model('Order',OrderSchema)

export default Order;