import mongoose from "mongoose"


const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    planId: String,
    amount: Number,
    creadits: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created",
    },
}, { timestamps: true })


const Payment = mongoose.Model("Payment", paymentSchema)

export default Payment