import React from 'react';
import './App.css'
import CreatePost from './components/createPost/CreatePost';
import Posts from './components/Posts/Posts';
import Navbar from './components/navbar/Navbar';
import MiniNavbar from './components/miniNav/MiniNavbar';

function App() {
  return (
    <div className='app-container'>
      <h1 className='app-title'>Crux</h1>
      <div className='content-container'>
        <div className='navbar-container'>
          <Navbar />
        </div>
        <div className='posts-create-container'>
          <div className='posts-container'>
            <Posts />
          </div>
          <div className='create-post-container'>
            <CreatePost />
          </div>
        </div>
        <div className='mini-navbar-container'>
          <MiniNavbar />
        </div>
      </div>
    </div>
  );
}

export default App