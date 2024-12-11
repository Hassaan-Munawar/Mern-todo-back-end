import express from "express";
const router = express.Router()

const tasks = [
    {
      id: 1,
      task: "Task 1",
    },
    {
      id: 2,
      task: "Task 2",
    },
    {
      id: 3,
      task: "Task 3",
    },
  ];

router.post('/', (req, res) => {
    const { task } = req.body
    tasks.push({ task, id: tasks.length + 1 })
    res.status(201).json({
        msg: "Task added successfully",
        error: false,
        data: tasks
    })
})

router.get('/', (req, res) => {
    res.status(200).json({
        msg: "Tasks fetched successfully",
        error: false,
        data: tasks
    })
})

router.get('/:id', (req, res) => {
    const task = tasks.find((data) => data.id == req.params.id)
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

router.put('/:id', (req, res) => {
    const { task } = req.body
    const taskToUpdate = tasks.find((data) => data.id == req.params.id)
    if (!taskToUpdate) return res.status(404).json({
        error: true,
        msg: "Task not found",
        data: null
    })
    if (taskToUpdate) taskToUpdate.task = task

    res.status(200).json({
        msg: "Task found successfully",
        error: false,
        data: taskToUpdate
    })
})


router.delete('/:id', (req, res) => {
    const taskIndex = tasks.findIndex((data) => data.id == req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({
            error: true,
            msg: "Task not found",
            data: null
        });
    }
    const deletedTask = tasks.splice(taskIndex, 1);

    res.status(200).json({
        msg: "Task deleted successfully",
        error: false,
        data: deletedTask
    });
});

export default router