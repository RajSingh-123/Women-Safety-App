import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Women Safety App</h1>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/contacts">Emergency Contacts</Link></li>
        <li><Link to="/contact">AddEmergencyContact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
