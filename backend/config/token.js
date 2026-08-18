import jwt from "jsonwebtoken"

const generateToken = async (userId) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY, {expiresIn: "3d"})
        return token
    } catch (err) {
        console.log(err)
    }
}

export default generateToken