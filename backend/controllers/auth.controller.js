import generateToken from "../config/token.js"
import User from "../models/user.model.js"

export const googleAuth = async (req, res) => {
    try {
        const { name, email } = req.body
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name: name,
                email: email
            })
        }

        let token = await generateToken(user._id)
        res.cookie("token", token, {
            http: true,
            secure: false,
            sameSite: "strict",
            maxAge: 3*24*60*60*1000
        })

        return res.status(200).json(user)
    } catch (err) {
        console.error("GOOGLE Authentation Error: ", err)

        return res.status(500).json({
            message: `Google authentation error`,
            error: err.message
        })
    }
}

export const logout =async (req, res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message: "Logout"})       
    } catch (error) {
        return res.status(500).json({message: `fail to logout ${err}`})               
    }
}