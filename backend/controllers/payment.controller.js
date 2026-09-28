import Payment from "../models/payment.model.js";
import razorpy from "../services/razorpay.service.js";
import crypto from "crypto"
import User from "../models/user.model.js";




export const createOrder = async (req, res) => {
    try {
        const { planId, amount, credits } = req.body;

        if(!amount || !credits){
            return res.status(400).json({
                message: "Invalid Plan."
            })
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }


        const order = await razorpy.orders.create(options)

        await Payment.create({
            userId: req.userId,
            planId,
            amount,
            credits,
            razorpayOrderId: order.id,
            status: "created",
        })

        return res.json(order);
    } catch (err) {
        return res.status(500).json({
            message: `Failed to create Razorpay Order ${err}`
        })
    }
}


// export const verifyPayment = async (req, res) => {
//     try {
//         const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

//         const body = razorpay_order_id + "|" + razorpay_payment_id;

//         const expectedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(body)
//             .digest("hex");


//         console.log("Received signature:", razorpay_signature);
//     console.log("Expected signature:", expectedSignature);
        
//         if(expectedSignature !== razorpay_signature){
//             return res.status(400).json({
//                 message: "Invaild Payment Signature."
//             })
//         }


//         const payment = await Payment.findOne({
//             razorpayOrderId: razorpay_order_id,
//         })

//         console.log("FOUND PAYMENT:", payment);

//         if(!payment){
//             return res.status(404).json({
//                 message: "Payment Not Found"
//             })
//         }

//         if(payment.status === "paid"){
//             return res.json({
//                 message: "Alreday Processed"
//             })
//         }


//         // Update Payment Record
//         payment.status ="paid";
//         payment.razorpayPaymentId = razorpay_payment_id;
//         await payment.save();


//         // Add Credits To User
//         const updateUser = await User.findByIdAndUpdate(payment.userId, {
//             $inc: { credits: payment.credits}
//         }, { new: true });


//         res.json({
//             success: true,
//             message: "Payment verified and creadits added.",
//             user: updateUser,
//         })

//     } catch (err) {
//         console.error("VERIFY PAYMENT ERROR:", err);

//         return res.status(500).json({
//             message: `Failed Razorpay Payment: ${err.message}`
//         });
//     }
// }


export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest("hex");


        console.log("Received signature:", razorpay_signature);
    console.log("Expected signature:", expectedSignature);
        
        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({
                message: "Invaild Payment Signature."
            })
        }


        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id,
        })

        console.log("FOUND PAYMENT:", payment);

        if(!payment){
            return res.status(404).json({
                message: "Payment Not Found"
            })
        }

        if(payment.status === "paid"){
            return res.json({
                message: "Alreday Processed"
            })
        }


        // Update Payment Record
        payment.status ="paid";
        payment.razorpayPaymentId = razorpay_payment_id;
        await payment.save();


        // Add Credits To User
        const updateUser = await User.findByIdAndUpdate(payment.userId, {
            $inc: { credits: payment.credits}
        }, { new: true });


        res.json({
            success: true,
            message: "Payment verified and creadits added.",
            user: updateUser,
        })

    } catch (err) {
        console.error("VERIFY PAYMENT ERROR:", err);

        return res.status(500).json({
            message: `Failed Razorpay Payment: ${err.message}`
        });
    }
}