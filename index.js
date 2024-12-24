import express from "express";
import userRoutes from './routes/user.js'
import todoRoutes from './routes/todos.js'
import mongoose from "mongoose";
import "dotenv/config"
import { authenticateUser } from "./middleware/authentication.js";

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB connected"))
  .catch((err) => console.log(err))


// app.get("/" , authenticateUser, (req, res) => {
//     res.send('Welcome '+ req.user.fullname)
// });

app.get("/" , (req, res) => {
  res.send('Welcome')
});



app.use('/user', userRoutes)

app.use('/todos', todoRoutes)



app.listen(process.env.PORT, () => console.log("Server is running on PORT " + process.env.PORT));

