import React, { useState } from 'react';
import axios from 'axios';
import './searchByUser.css'

function SearchByUser({ closePopup }) {
  const [userEmail, setUserEmail] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSearchByUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/blogs/${userEmail}`);
      setSearchResults(response.data);
      setAlertMessage('Search successful');
    } catch (error) {
      setSearchResults([]);
      setAlertMessage('No blogs made yet by this user...');
      console.error(error);
    }
  };

  return (
    <div className="search-by-user-popup">
      <div className="search-by-user-popup-box">
        <button className="close-button" onClick={closePopup}>
          X
        </button>
        <h2>Search by User</h2>
        <input
          type="email"
          placeholder="User Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <button onClick={handleSearchByUser}>Search</button>
        {alertMessage && <p className="alert-message">{alertMessage}</p>}
        {searchResults.length > 0 && (
          <div>
            <h3>Search Results:</h3>
            <ul>
            {searchResults.map((result, index) => (
        <li key={index}>
          <p>Title: {result.title}</p>
          <p>Description: {result.description}</p>
        </li>
      ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchByUser;
