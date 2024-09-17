import React from 'react';
import { SignOut } from './AuthComponents';
import '../css/Navbar.css';

interface NavbarProps {
  username: string;
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-logo">My App</h1>
      </div>
      <div className="navbar-right">
        <span className="navbar-username">Welcome, {username}</span>
        <SignOut />
      </div>
    </nav>
  );
};

export default Navbar;
