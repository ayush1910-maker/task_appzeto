import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateAccessTokens = async function (userId) {
    try {
        const user = await User.findByPk(userId)

        const accessToken = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {expiresIn: "15d"}
        )

        return { accessToken }
        
    } catch (error) {
        console.log("Token generation error" , error.message);
    }
}

const register_user = async (req ,res) => {
    try {
        
        const {name , email , password , role } = req.body

        const existedUser = await User.findOne({where: {email}})

        if (existedUser) {
            return res.json({status: false , message: "Account already existed"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        })

        return res.json({
            status: true ,
            message: "User Registered successfully",
            data: user
        })

    } catch (error) {
        return res.json({status: false , message: error.message})
    }
}

const login = async (req ,res) => {
    try {

        const { email ,password } = req.body

        const existedUser = await User.findOne({where: {email}})

        if (!existedUser) {
            return res.json({status: false , message: "User Not Found"})
        }

        const { accessToken } = await generateAccessTokens(existedUser.id)

         const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(201)
        .cookie("accessToken", accessToken , options)
        .json({
            status: true,
            message: "user LoggedIn successfully",
            user: {
                id: existedUser.id,
                email: existedUser.email
            },
            accessToken
        })


        
    } catch (error) {
        return res.json({status: false , message: error.message})
    }
}

export {
    register_user,
    login
}