import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './Posts.css';
import UpdatePopup from '../updatePopup/UpdatePopup'; 
import DeletePostPopup from '../deletePost/DeletePostPopup';

function Posts() {
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("http://localhost:5000/api/blogs");
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openEditPopup = (blog) => {
    setSelectedBlog(blog);
    setIsPopupOpen(true);
  };

  const openDeletePopup = (blog) => {
    console.log('openDeletePopup');
    setBlogToDelete(blog);
    setIsDeletePopupOpen(true);
  };

  return (
    <div>
      <ul className="blog-list">
        {data.map((blog) => (
          <li key={blog.id} className="blog-item">
            <div className="blog-box">
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-description">{blog.description}</p>
              <p className="user-ref">User Reference: {blog.userRef}</p>
              <p className="user-ref">Blog ID: {blog.id}</p>
            </div>
            <div className="blog-icons">
              <button className="edit-button" onClick={() => openEditPopup(blog)}>
                <span role="img" aria-label="Edit">✏️</span>
              </button>
              <button className="delete-button" onClick={() => openDeletePopup(blog)}>
                <span role="img" aria-label="Delete">🗑️</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isPopupOpen && (
        <UpdatePopup
          id={selectedBlog.id}
          title={selectedBlog.title}
          content={selectedBlog.description}
          image={selectedBlog.image}
          userEmail={selectedBlog.userRef}
          closePopup={() => setIsPopupOpen(false)}
        />
      )}

      {isDeletePopupOpen && (
        <DeletePostPopup
          id={blogToDelete.id}
          userEmail={blogToDelete.userRef}
          closePopup={() => setIsDeletePopupOpen(false)}
          onDelete={(deletedId) => {
            const updatedData = data.filter((blog) => blog.id !== deletedId);
            setData(updatedData);
            setIsDeletePopupOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Posts;
