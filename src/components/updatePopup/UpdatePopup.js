import React, { useState } from 'react';
import Axios from 'axios';
import './updatePopup.css';

function UpdatePopup({ id, title, content, image, userEmail, closePopup }) {
  const [formData, setFormData] = useState({
    title,
    description: content, 
    image,
    userEmail,
  });

  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, description, image, userEmail } = formData;

      const updatedData = {
        title,
        description,
        image,
        userEmail,
      };

      const res = await Axios.put(`http://localhost:5000/api/blogs/${id}`, updatedData);
      console.log('Blog updated:', res.data);

      setAlertMessage('Blog updated successfully');

      setFormData({
        title: '',
        description: '',
        image: '',
        userEmail: '',
      });

      closePopup();

      window.location.reload();
    } catch (error) {
      console.error(error);

      setAlertMessage('Error updating blog');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="update-popup">
      <div className="update-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
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
              name="description"
              value={formData.description}
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
          <div>
            <label>User Email</label>
            <input
              type="text"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Update</button>
          <button onClick={closePopup}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UpdatePopup;
