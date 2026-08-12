import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { getCurUSer } from "../controllers/user.controller.js"

const userRouter = express.Router()


userRouter.get("/current-user", isAuth, getCurUSer)


export default userRouter