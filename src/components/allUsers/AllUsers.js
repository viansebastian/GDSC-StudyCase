import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllUsers.css';

function AllUsers({ closePopup }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="all-users-popup">
      <div className="all-users-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>All Users</h2>
        <ul className="user-list">
          {users.map((user) => (
            <li key={user.id} className="user-item">
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllUsers;
