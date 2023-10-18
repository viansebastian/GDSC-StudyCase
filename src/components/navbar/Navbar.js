import React, { useState } from 'react';
import CreateAccount from '../createAccount/CreateAccount.js';
import SearchBlog from '../searchBlog/SearchBlog'; 
import SearchUser from '../searchUser/SearchUser.js';
import Login from '../loginAccount/Login.js';
import SearchByUser from '../searchByUser/SearchByUser.js';
import PersonalInfo from '../personalInfo/PersonalInfo.js';
import AllUsers from '../allUsers/AllUsers.js';
import './Navbar.css';

function Navbar() {
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isSearchBlogOpen, setIsSearchBlogOpen] = useState(false); 
  const [isSearchUserOpen, setIsSearchUserOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSearchByUserOpen, setIsSearchByUserOpen] = useState(false);
  const [isPersonalInfoOpen, setIsPersonalInfoOpen] = useState(false);
  const [isAllUsersOpen, setIsAllUsersOpen] = useState(false);

  const openCreateAccountPopup = () => {
    setIsCreateAccountOpen(true);
  };

  const openSearchBlogPopup = () => {
    setIsSearchBlogOpen(true);
  };

  const openSearchUserPopup = () => {
    setIsSearchUserOpen(true);
  };

  const openLoginPopup = () => {
    setIsLoginOpen(true);
  };

  const openSearchByUserPopup = () => {
    setIsSearchByUserOpen(true); 
  };

  const openPersonalInfoPopup = () => {
    setIsPersonalInfoOpen(true); 
  };

  const openAllUsersPopup = () => {
    setIsAllUsersOpen(true);
  };

  const closeCreateAccountPopup = () => {
    setIsCreateAccountOpen(false);
  };

  const closeSearchBlogPopup = () => {
    setIsSearchBlogOpen(false);
  };

  const closeSearchUserPopup = () => {
    setIsSearchUserOpen(false);
  };

  const closeLoginPopup = () => {
    setIsLoginOpen(false); 
  };

  const closeSearchByUserPopup = () => {
    setIsSearchByUserOpen(false); 
  };

  const closePersonalInfoPopup = () => {
    setIsPersonalInfoOpen(false); 
  };

  const closeAllUsersPopup = () => {
    setIsAllUsersOpen(false);
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <button onClick={openSearchBlogPopup}>Search Post</button>
        </li>
        <li>
          <button onClick={openSearchByUserPopup}>Search Posts by User</button> 
        </li>
        <li>
          <button onClick={openSearchUserPopup}>Search User</button>
        </li>
        <li>
          <button onClick={openAllUsersPopup}>All Users</button>
        </li>
        <li>
          <button onClick={openPersonalInfoPopup}>Personal Info</button>
        </li>
        <li>
          <button onClick={openCreateAccountPopup}>Create Account</button>
        </li>
        <li>
          <button onClick={openLoginPopup}>Login</button>
        </li>
      </ul>

      {isCreateAccountOpen && (
        <CreateAccount closePopup={closeCreateAccountPopup} />
      )}

      {isSearchBlogOpen && (
        <SearchBlog closePopup={closeSearchBlogPopup} />
      )}

      {isSearchUserOpen && (
        <SearchUser closePopup={closeSearchUserPopup} />
      )}

      {isLoginOpen && (
        <Login closePopup={closeLoginPopup} />
      )}

      {isSearchByUserOpen && (
        <SearchByUser closePopup={closeSearchByUserPopup} />
      )}

      {isPersonalInfoOpen && (
        <PersonalInfo closePopup={closePersonalInfoPopup} />
      )}

      {isAllUsersOpen && (
        <AllUsers closePopup={closeAllUsersPopup} />
      )}
    </nav>
  );
}

export default Navbar;
