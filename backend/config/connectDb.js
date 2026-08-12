import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DataBase Connect");
    } catch (err) {
        console.log(`DataBase error ${err}`)
    }
}

export default connectDb