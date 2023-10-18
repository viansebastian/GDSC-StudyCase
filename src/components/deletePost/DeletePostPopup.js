import React, { useState } from 'react';
import Axios from 'axios';
import './DeleteConfirmationPopup.css'; 

function DeleteConfirmationPopup({ id, closePopup, onDelete }) {
  const [userEmail, setUserEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleDelete = async () => {
    if (userEmail.trim() !== '') {
      try {
        const res = await Axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          data: { userEmail },
        });

        setAlertMessage('Blog deleted successfully');

        onDelete(id);

        closePopup();

        window.location.reload();
      } catch (error) {
        console.error(error);

        setAlertMessage('Error deleting blog');
      }
    } else {
      setAlertMessage('Please enter your email for confirmation');
    }
  };

  return (
    <div className="delete-confirmation-popup">
      <div className="delete-confirmation-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Delete Post</h2>
        <p>Are you sure you want to delete your blog?</p>
        <p>Please enter your email to confirm:</p>
        <input
          type="text"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <button onClick={handleDelete}>Delete</button>
        <button onClick={closePopup}>Cancel</button>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
      </div>
    </div>
  );
}

export default DeleteConfirmationPopup;
