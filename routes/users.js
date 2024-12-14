import express from "express";
import Usermodel from "../models/usermodel.js";
const router = express.Router()

const users = [
    {
        id: 1,
        email: "hassaan@gmail.com",
        fullname: "Hassaan",
    },
    {
        id: 2,
        email: "habib@gmail.com",
        fullname: "Habib",
    },
    {
        id: 3,
        email: "ahmed@gmail.com",
        fullname: "Ahmed",
    },
]

router.post('/', async(req, res) => {
    const { fullName, email } = req.body
    let newUser = new Usermodel({
        fullName,
        email,
    })

    newUser = await newUser.save()

    res.status(201).json({
        msg: "User added successfully",
        error: false,
        data: newUser
    })
})

router.get('/', async (req, res) => {
    const users = await Usermodel.find()
    res.status(200).json({
        msg: "User fetched successfully",
        error: false,
        data: users
    })
})

router.get('/:id', async(req, res) => {
    const user = await Usermodel.findOne({_id:req.params.id})
    if (!user) return res.status(404).json({
        error: true,
        msg: "User not found",
        data: null
    })

    res.status(200).json({
        msg: "User found successfully",
        error: false,
        data: user
    })
})

router.put('/:id', async (req, res) => {
    const { fullName, email } = req.body
    const userToupdate = await Usermodel.findByIdAndUpdate(req.params.id,{fullName,email})
    if (!userToupdate) return res.status(404).json({
        error: true,
        msg: "User not found",
        data: null
    })

    userToupdate.fullName = fullName
    userToupdate.email = email

    res.status(200).json({
        msg: "User updated successfully",
        error: false,
        data: userToupdate
    })
})

router.delete('/:id', async(req, res) => {
    const usertoDelete = await Usermodel.findByIdAndDelete(req.params.id)
    if (!usertoDelete) {
        return res.status(404).json({
            error: true,
            msg: "User not found",
            data: null
        });
    }

    res.status(200).json({
        msg: "User deleted successfully",
        error: false,
        data: usertoDelete
    });
});

export default router