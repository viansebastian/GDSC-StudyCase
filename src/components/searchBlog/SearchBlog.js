import React, { useState } from 'react';
import axios from 'axios';
import './searchBlog.css'; 

function SearchBlog({ closePopup }) {
  const [blogId, setBlogId] = useState('');
  const [blogData, setBlogData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSearchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blogs/${blogId}`);
      setBlogData(response.data);
      setAlertMessage('');
    } catch (error) {
      setAlertMessage('Blog not found');
      console.error(error);
      setBlogData(null);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setBlogId(value);
  };

  const closeSearchBlogPopup = () => {
    setBlogData(null);
    closePopup();
  };

  return (
    <div className="create-account-popup">
      <div className="create-account-popup-box">
        <button className="close-button" onClick={closeSearchBlogPopup}>
          X
        </button>
        <h2>Find Post</h2>
        <input
          type="text"
          placeholder="Post ID"
          value={blogId}
          onChange={handleInputChange}
          required
        />
        <button onClick={handleSearchBlog}>Find Post</button>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
        {blogData && (
          <div>
            <h3>Blog Title: {blogData.title}</h3>
            <p>Description: {blogData.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBlog;
