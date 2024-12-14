import express from "express";
import userRoutes from './routes/users.js'
import taskRoutes from './routes/tasks.js'
import mongoose from "mongoose";
import "dotenv/config"

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("DB connected"))
  .catch((err) => console.log(err))


function middleware(req, res, next) {
    req.query.auth == 'true' ? next() : res.send('unauthorized user')
}

app.use(middleware)


app.get("/" , (req, res) => {
    res.send('User Authorized Successfully...')
});



app.use('/users', userRoutes)

app.use('/tasks', taskRoutes)



app.listen(process.env.PORT, () => console.log("Server is running on PORT " + process.env.PORT));

