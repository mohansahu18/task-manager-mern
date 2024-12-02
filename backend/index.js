import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { userRouter } from './routes/user-routes.js';
import { taskRouter } from './routes/task-routes.js';
import 'dotenv/config'
import DbConnection from './config/DbConnection.js';



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
DbConnection()