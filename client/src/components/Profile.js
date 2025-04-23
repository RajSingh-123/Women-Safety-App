import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={() => navigate('/login')}>Proceed to Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
