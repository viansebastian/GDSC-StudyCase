import { React, useState } from 'react'
import Axios from 'axios'
import './addPost.css'

function CreatePost() {
    const [formData, setFormData] = useState({
        email: '',
        title: '',
        content: '',
        image: '',
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const { title, content, image, email } = formData; 
      
          const postData = {
            title,
            description: content,
            image,
            userEmail: email, 
          };
      
          const res = await Axios.post("http://localhost:5000/api/blogs/new", postData);
          console.log('Blog created:', res.data);

          window.location.reload();

        } catch (error) {
          console.error(error);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      console.log(formData);
    
      return (
        <div className='create-post-box'>
            <h2>Make a Post</h2>
            <form onSubmit={handleSubmit}>
          <div>
            <label>User Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Image Link (optional)</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Post</button>
        </form>
        </div>
      );
}

export default CreatePost