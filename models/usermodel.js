import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema({
    email: String,
    fullName: String,
});

const Usermodel = mongoose.model('Users', userSchema);

export default Usermodel