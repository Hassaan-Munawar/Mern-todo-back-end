import express from "express";
import Taskmodel from "../models/taskmodel.js";
const router = express.Router()


function slugify(str) {
    return String(str)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

router.post('/', async (req, res) => {
    try {
        const { task } = req.body
        let newTask = new Taskmodel({ task: task, slug: slugify(task) })
        newTask = await newTask.save()
        res.status(201).json({
            msg: "Task added successfully",
            error: false,
            data: newTask
        })

    } catch (error) {
        res.json({
            msg: error.message,
            error: true,
        })
    }

})

router.get('/', async (req, res) => {
    const Tasks = await Taskmodel.find()
    res.status(200).json({
        msg: "Tasks fetched successfully",
        error: false,
        data: Tasks
    })
})

router.get('/:slug', async (req, res) => {
    const task = await Taskmodel.findOne({ slug: req.params.slug })
    if (!task) return res.status(404).json({
        error: true,
        msg: "Task not found",
        data: null
    })

    res.status(200).json({
        msg: "Task found successfully",
        error: false,
        data: task
    })
})


router.put('/:id', async (req, res) => {
    const { task } = req.body
    const taskToUpdate = await Taskmodel.findByIdAndUpdate(req.params.id, { task })
    if (!taskToUpdate) return res.status(404).json({
        error: true,
        msg: "Task not found",
        data: null
    })

    taskToUpdate.task = task

    res.status(200).json({
        msg: "Task updated successfully",
        error: false,
        data: taskToUpdate
    })
})


router.delete('/:id', async (req, res) => {
    const taskTodelete = await Taskmodel.findByIdAndDelete(req.params.id)
    if (!taskTodelete) {
        return res.status(404).json({
            error: true,
            msg: "Task not found",
            data: null
        });
    }

    res.status(200).json({
        msg: "Task deleted successfully",
        error: false,
        data: taskTodelete
    });
});

export default router