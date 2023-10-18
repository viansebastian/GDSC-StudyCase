import express from 'express'; 
import { addUser, getAllUsers, getUser, updateUser, deleteUser, userLogin, userBlogs, getPersonalInfo } from '../controllers/user-controllers.js';

// Create an Express Router for User routes
const userRouter = express.Router(); 

userRouter.post('/users/signIn', addUser); // button - done
userRouter.post('/users/login', userLogin); // button - done
userRouter.get('/users/blogs/:userEmail', userBlogs); // search bar - done basically 
userRouter.get('/users', getAllUsers); // main page - done --> updates: for admin only
userRouter.get('/users/:userEmail', getUser) // search - done
userRouter.put('/users/:id', updateUser); // done
userRouter.delete('/users/:id', deleteUser); // done
userRouter.get('/users/personal/:userEmail', getPersonalInfo); // done


export default userRouter;