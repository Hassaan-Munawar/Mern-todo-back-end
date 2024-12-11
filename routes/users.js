import express from "express";
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

router.post('/', (req, res) => {
    const { fullname, email } = req.body
    users.push({ fullname, email, id: users.length + 1 })
    res.status(201).json({
        msg: "User added successfully",
        error: false,
        data: users
    })
})

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "User fetched successfully",
        error: false,
        data: users
    })
})

router.get('/:id', (req, res) => {
    const user = users.find((data) => data.id == req.params.id)
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

router.put('/:id', (req, res) => {
    const { fullname, email } = req.body
    const user = users.find((data) => data.id == req.params.id)
    if (!user) return res.status(404).json({
        error: true,
        msg: "User not found",
        data: null
    })
    if (fullname) user.fullname = fullname
    if (email) user.email = email

    res.status(200).json({
        msg: "User found successfully",
        error: false,
        data: user
    })
})

router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex((data) => data.id == req.params.id);
    if (userIndex === -1) {
        return res.status(404).json({
            error: true,
            msg: "User not found",
            data: null
        });
    }
    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
        msg: "User deleted successfully",
        error: false,
        data: deletedUser
    });
});

export default router