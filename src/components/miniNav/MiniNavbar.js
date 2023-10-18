import React, { useState } from 'react';
import './MiniNavbar.css';
import UpdateAccount from './UpdateAccount';
import DeleteAccount from './DeleteAccount';

function MiniNavbar({ handleDeleteAccount }) {
  const [isUpdateAccountOpen, setIsUpdateAccountOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  const openUpdateAccountPopup = () => {
    setIsUpdateAccountOpen(true);
  };

  const closeUpdateAccountPopup = () => {
    setIsUpdateAccountOpen(false);
  };

  const openDeleteAccountPopup = () => {
    setIsDeleteAccountOpen(true);
  };

  const closeDeleteAccountPopup = () => {
    setIsDeleteAccountOpen(false);
  };

  return (
    <div className="mini-navbar">
      <div className="button-container">
        <button onClick={openUpdateAccountPopup} className="button-update">
          Update Account
        </button>
        <button onClick={openDeleteAccountPopup} className="button-delete">
          Delete Account
        </button>
      </div>

      {isUpdateAccountOpen && (
        <UpdateAccount closePopup={closeUpdateAccountPopup} />
      )}

      {isDeleteAccountOpen && (
        <DeleteAccount closePopup={closeDeleteAccountPopup} />
      )}
    </div>
  );
}

export default MiniNavbar;
