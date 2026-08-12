import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if(!token){
            return res.status(400).json({message: "token not found"})
        }

        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if(!verifyToken){
            return res.status(400).json({message: "invalid token"})
        }

        req.userId = verifyToken.userId
        
        next()
    } catch (err) {
        console.error("isAuthentation Error: ", err)

        return res.status(500).json({
            message: `isAuthentation error`,
            error: err.message
        })
    }
}

export default isAuth