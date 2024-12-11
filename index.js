import express from "express";
import userRoutes from './routes/users.js'
import taskRoutes from './routes/tasks.js'

const app = express();
const PORT = 4000;

app.use(express.json());


function middleware(req, res, next) {
    req.query.auth == 'true' ? next() : res.send('unauthorized user')
}

app.use(middleware)


app.get("/" , (req, res) => {
    res.send('User Authorized Successfully...')
});



app.use('/users', userRoutes)

app.use('/tasks', taskRoutes)



app.listen(PORT, () => console.log("Server is running on PORT " + PORT));

