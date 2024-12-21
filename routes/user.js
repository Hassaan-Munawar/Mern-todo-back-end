import express from "express";
import Usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router()
const loginSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6).required(),
});
const registerSchema = Joi.object({
    fullname: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
    }),
    password: Joi.string().min(6).required(),
});

router.post('/register', async (req, res) => {
        const { error, value } = registerSchema.validate(req.body);
        if (error) return res.json({
            message: error.message,
            error: true
        })
        const user = await Usermodel.findOne({ email: value.email });
        if (user)
            return res.status(403).json({
                message: "User with this email is already registered",
                error: true,
            })

        const hashedPassword = await bcrypt.hash(value.password, 12);
        value.password = hashedPassword;

        let newUser = new Usermodel({ ...value });
        newUser = await newUser.save();

        res.status(200).json({
            data: newUser,
            message: "User Registered successfully",
            error: false,
        })
})

router.post("/login", async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(403).json({
        message: error.message,
        error: true
    })

    const user = await Usermodel.findOne({ email: value.email }).lean();
    if (!user)
        return res.status(403).json({
            message: "User is not registered.",
            error: true
        })
            ;

    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if (!isPasswordValid)
        return res.status(403).json({
            message: "Invalid Creddentials",
            error: true
        })


    let token = jwt.sign(user, process.env.AUTH_SECRET);

    res.status(200).json({
        data: { user, token },
        message: "User Login successfully",
        error: false,
    })
});


export default router