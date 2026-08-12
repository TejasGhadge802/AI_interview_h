import User from "../models/user.model.js"


export const getCurUSer = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message: "User Not found"})
        }
        return res.status(200).json(user)
    } catch (err) {
        return res.status(500).json({message: "User Not found"})
    }
}