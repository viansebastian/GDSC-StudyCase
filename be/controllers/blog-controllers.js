import admin from "firebase-admin"; 
import { Blog } from "../models/blog.js";

// App initialized already so only calling the firestore is enough
const firestore = admin.firestore(); 

// Get All Blogs
export const getAllBlogs = async (req, res, next) => {
    try {
        // Fetch data from Firestore
        const blogs = await firestore.collection('blogs'); 
        const blogsData = await blogs.get(); 
        const blogsArr = []; 

        // Check if Blog exists
        if(blogsData.empty) {
            res.status(404).send('no blogs recorded');
        }
        else {
            blogsData.forEach(doc => {
                // Fetch User Reference
                const userRef = doc.data().userRef; 

                // Fetch User ID from Reference
                const userId = userRef._path.segments[userRef._path.segments.length - 1];
                
                // Format response
                const blog = new Blog(
                    doc.id, 
                    doc.data().title, 
                    doc.data().description, 
                    doc.data().image, 
                    userId
                );

                // Push formatted response to array
                blogsArr.push(blog)
            });
            // Respond with array 
            res.send(blogsArr);
        }
    } catch (err) {
        // Send response with random words to determine where error comes from
        res.status(400).send(err.message + "jwfefvj");
    }
}; 

// Post a Blog
export const postBlog = async (req, res, next) => {
    const { title, description, image, userEmail } = req.body; 
        
    try { 
        // Fetch User based on userEmail
        const userQuery = await firestore.collection('users').where('email', '==', userEmail).get();
        if (userQuery.empty) { return res.status(400).send('log in or sign up first'); }
        
        // Get the User Reference 
        const userDoc = userQuery.docs[0];
        const userRef= userDoc.ref; 
        
        // Create new Blog
        const blog = new Blog(null, title, description, image, userRef);

        // Post the Blog
        const blogDocRef = await firestore.collection('blogs').add(blog.toJson()); //use add instead of doc().set() to generate random id by firestore

        // Fetch posted Blog data
        const blogData = await blogDocRef.get(); 

        // Format response 
        const blogResponse = { 
            title : blogData.get('title'),
            description : blogData.get('description'),
            image : blogData.get('image'),
            userId : blogData.get('userRef').id,
        }

        // Respond with formatted response
        res.send({
            blog: blogResponse,
        });
    } catch (err) {
        // Send response with random words to determine where error comes from
        res.status(400).send(err.message + " blabla");
    }
};

// Get a Blog
export const getBlog = async (req, res, next) => {
    try {
        // Fetch ID from request params
        const id = req.params.id;

        // Fetch data from Firestore
        const blog = await firestore.collection('blogs').doc(id);
        const blogData = await blog.get(); 
        if(!blogData.exists) {
            res.status(404).send('blog not exist');
        } else {
            // Format response 
            const blogResponse = { 
                title : blogData.get('title'),
                description : blogData.get('description'),
                image : blogData.get('image'),
                userId : blogData.get('userRef').id,
            }
            
            // Respond with the formatted response
            res.send(blogResponse);
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Update a Blog
export const updateBlog = async (req, res, next) => {
    try {
        // Fetch ID from request params
        const id = req.params.id;

        // Fetch data from request body
        const { title, description, image, userEmail } = req.body; 

        // Fetch data from Firestore
        const blog = await firestore.collection('blogs').doc(id).get();

        if (!blog.exists){ return res.status(404).send('blog not found'); }

        // Fetch user ID from Firestore Reference
        const userIdFromBlog = blog.data().userRef._path.segments[1];

        // Get User ID from userEmail
        const userIdFromRequest = await getUserIdFromReqEmail(userEmail);

        // Check Authorization
        if (userIdFromBlog !== userIdFromRequest){ return res.status(403).send('unauthorized'); }

        // Update Blog
        const blogRef = firestore.collection('blogs').doc(id); 
        await blogRef.update({ title, description, image });

        // Update confirmation
        res.send('update success');

    } catch (err) {
        res.status(400).send(err.message);
    }
};

// Delete a Blog
export const deleteBlog = async (req, res, next) => {
    try {
        // Fetch ID from request params
        const id = req.params.id;

        // Fetch userEmail from request body
        const { userEmail } = req.body; 

        // Fetch data from Firestore
        const blog = await firestore.collection('blogs').doc(id).get(); 

        if (!blog.exists){ return res.status(404).send('blog doesnt exist');}

        // Fetch user ID from Firestore Reference
        const userIdFromBlog = blog.data().userRef._path.segments[1];

        // Get User ID from userEmail
        const userIdFromRequest = await getUserIdFromReqEmail(userEmail);

        // Check Authorization
        if (userIdFromBlog !== userIdFromRequest){ return res.status(403).send('unauthorized'); }

        // Delete the Blog
        const blogRef = firestore.collection('blogs').doc(id); 
        await blogRef.delete();

        // Delete confirmation
        res.send('blog deleted');

    } catch (err) {
        res.status(400).send(err.message); 
    }
};


// Helper Functions
// Get User ID from User Email 
async function getUserIdFromReqEmail(userEmail){
        // Fetch User based on registered email address
    const userQuery = await firestore.collection('users').where('email', '==', userEmail).get();
    
    if (userQuery.empty) {
        throw new Error('User not found'); 
    }

        // Return ID of found User 
    return userQuery.docs[0].id;
}
