import express from 'express'; 
import  userRouter  from './routes/user-routes.js';
import blogsRouter from './routes/blog-routes.js';
import cors from 'cors';

const app = express(); 
app.use(express.json()); 
app.use(cors()); 

//users api
app.use('/api', userRouter)

//blogs api
app.use('/api', blogsRouter)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Port: ${port}`));