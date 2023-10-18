import admin from "firebase-admin"; 
import serviceAccount from "../serviceAccount.json" assert {type : 'json'}; 
import { User } from "../models/user.js";
import bcrypt, { genSaltSync } from "bcrypt";

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}); 

// Initialize FireStrore
const firestore = admin.firestore(); 

// Add User
export const addUser = async (req, res, next) => {
    // Fetch needed data from request body
    const { name, email, password } = req.body; 

    // Create hash salt
    const salt = 10; 
    
    try {
        // Check if user already exists
        const existingUser = await firestore.collection('users').where('email', '==', email).get();
        if (!existingUser.empty){ return res.status(400).send('user already registered')};

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create new User
        const user = new User(null, name, email, hashedPassword); 

        // const userJson = {
        //     name,
        //     email,
        //     password : hasedPassword,
        // };

        // Add User to Firestore
        await firestore.collection('users').add(user.toJson()); //use add instead of doc().set() to generate random id by firestore

        // Send User as response
        res.send(user.toJson());

    } catch (err) {
        // Send response with random words to determine where error comes from
        res.status(400).send(err.message + "blabla");
    }
};

// Get All Users
export const getAllUsers = async (req, res, next) => {
    try {
        // Fetch data from Firestore
        const users = await firestore.collection('users'); 
        const usersData = await users.get(); 

        // Create empty User array
        const usersArr = []; 

        // Check if User exists
        if(usersData.empty) {
            res.status(404).send('no users');
        }
        else {
            usersData.forEach(doc => {
                // Fetch specific User data
                const user = new User(
                    doc.id, 
                    doc.data().name, 
                    doc.data().email, 
                    //doc.data().password        // hide password to be more secure
                );
                // Push fetched User data to User array
                usersArr.push(user);
            });
            // Send User array as response
            res.send(usersArr);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const getPersonalInfo = async (req, res, next) => {
    try {
        const { userEmail } = req.params; // Remove the '.userEmail'

        if (!userEmail) {
            return res.status(400).send('Missing user email');
        }

        const userId = await getUserIdFromReqEmail(userEmail);

        if (!userId) {
            return res.status(404).send('User does not exist');
        }

        const user = await firestore.collection('users').doc(userId);
        const userData = await user.get();

        if (!userData.exists) {
            return res.status(404).send('User does not exist');
        } else {
            const { email, name } = userData.data();
            res.send({ userId, name, email });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Get one User
export const getUser = async (req, res, next) => {
    try {
        // Fetch id from request params
        const userEmail = req.params.userEmail;

        // Get User Id from User Email 
        const userId = await getUserIdFromReqEmail(userEmail);

        // Fetch data from Firestore
        const user = await firestore.collection('users').doc(userId);
        const userData = await user.get(); 

        // Check if the user exists
        if(!userData.exists) {
            res.status(404).send('user does not exist');
        } else {
            // Send User data as response
            // res.send(userData.data());

            // Create an object with only email and name
            const { email, name } = userData.data();

            // Send a response with email and name
            res.send({ name, email });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update User 
export const updateUser = async (req, res, next) => {
    try {
        // Fetch id from request params
        const id = req.params.id;
        
        // Fetch update from request body
        const userData = req.body; 

        // Get User Id from User Email
        const userId = await getUserIdFromReqEmail(userData.email); 

        // Validation
        if (userId === id) {
            
        // Fetch User
        const user = await firestore.collection('users').doc(id);

        // Check to see if User wants to update password or not
        if (userData.password){ 
            const salt = genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(userData.password, salt);
            userData.password = hashedPassword;
        }

        // Update User
        await user.update(userData); 

        // Update confirmation
        res.send('update success');

        } else { 
            res.status(404).send('Not Authorized');
        }
    } catch (err) {
        // Send response with random words to determine where error comes from
        res.status(400).send(err.message + " fodfnaroi");
    }
};

// Delete User 
export const deleteUser = async (req, res, next) => {
    try {
        // Fetch id from request params
        const id = req.params.id;

        // Fetch Email from request body
        const { userEmail, password } = req.body;

        // Get User Id from User Email
        const userId = await getUserIdFromReqEmail(userEmail); 

        console.log('userId:', userId);  //for debugging
        console.log('id:', id); 

        const existingUserQuery = await firestore.collection('users').where('email', '==', userEmail).get();
        if (existingUserQuery.empty){ return res.status(400).send('no user with this email')};

        // Fetch User Data 
        const existingUser = existingUserQuery.docs[0].data();

        // Compare password hash
        const passCompare = bcrypt.compare(password, existingUser.password); 

        // Validation
        if (userId === id && passCompare) {
            // Delete User
            await firestore.collection('users').doc(id).delete();

        // Delete confirmation
            res.send('user deleted');
        } else {
            res.status(404).send('not authorized blabla');
        }

        // // Delete User
        // await firestore.collection('users').doc(id).delete();

        // // Delete confirmation
        // res.send('user deleted');
    } catch (err) {
        res.status(400).send(err.message); 
    }
};

// User Login
export const userLogin = async (req, res, next) => {   
    const { email, password } = req.body; 
    
    try {
        // Check if user is exists
        const existingUserQuery = await firestore.collection('users').where('email', '==', email).get();
        if (existingUserQuery.empty){ return res.status(400).send('no user with this email')};

        // Fetch User Data 
        const existingUser = existingUserQuery.docs[0].data();

        // Compare password hash
        const passCompare = bcrypt.compare(password, existingUser.password); 

        // Password compare logic
        if(!passCompare){
            return res.status(400).json({message: "incorrect password"})
        } 
        // Login success
        return res.status(200).json({message: "login successful"})

    } catch (err) {
        return res.status(400).send("no user logged with this email")
    }
};

// Get all the Blogs a particular User has created
export const userBlogs = async (req, res, next) => {
    try {
        // Fetch email from request body
        const userEmail = req.params.userEmail;

        // Get User ID from Email
        const userId = await getUserIdFromReqEmail(userEmail);

        if (!userId) {
            return res.status(404).send('User not found');
        }

        // Fetch all blogs created by this User
        const blogs = await firestore.collection('blogs').where('userRef', '==', firestore.doc(`users/${userId}`)).get();
        //res.send(blogs);
        const userBlogsArr = [];

        // Fetch specific Blog data
        blogs.forEach((doc) => {
            const blogData = doc.data();
            const blogsResponse = {
                title : blogData.title, 
                description : blogData.description
            };
            
            // Push fetched data to an array
            userBlogsArr.push(blogsResponse);
        });

        // Send array as response 
        res.send(userBlogsArr);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Helper Function 
// Get User ID from User Email 
async function getUserIdFromReqEmail(userEmail){
    try {
        // Fetch User based on registered email address
    const userQuery = await firestore.collection('users').where('email', '==', userEmail).get();
    
    if (userQuery.empty) {
        throw new Error('User not found'); 
    }

    // Return ID of found User 
    return userQuery.docs[0].id;

    } catch (err) {
        throw err;
    }
    
}

