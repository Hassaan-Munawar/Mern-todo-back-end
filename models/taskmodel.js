import mongoose from "mongoose";
const { Schema } = mongoose;
const taskSchema = new Schema({
    task: { unique: true, type: String, required: true },
    slug:{ type: String, required: true }
});

const Taskmodel = mongoose.model('Tasks', taskSchema);

export default Taskmodel