import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new Schema({
    task: String,
});

const Taskmodel = mongoose.model('Tasks', taskSchema);

export default Taskmodel