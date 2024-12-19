import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    email: { unique: true, type: String, required: true },
    fullName: { type: String, required: true },
});

const Usermodel = mongoose.model('Users', userSchema);

export default Usermodel