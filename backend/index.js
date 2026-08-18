import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors"
import { googleAuth } from "./controllers/auth.controller.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.route.js";



const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)





const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDb()
})