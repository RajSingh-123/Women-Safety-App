

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import SOSButton from './components/SOSButton';
import LocationDisplay from './components/LocationDisplay';
import EmergencyContacts from './components/EmergencyContacts';
import AddEmergencyContact from './components/AddEmergencyContact';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import CaptureImage from './components/CaptureImage';
import './App.css';
import RecordMedia from './components/RecordMedia';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          'x-access-token': token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) {
            setIsAuthenticated(true);
          }
        });
    }
  }, []);

  return (
    <Router>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<><Navbar /><SOSButton /><CaptureImage/><RecordMedia/></>} />
            <Route path="/location" element={<><Navbar /><LocationDisplay /></>} />
            <Route path="/contacts" element={<><Navbar /><EmergencyContacts /></>} />
            <Route path="/contact" element={<><Navbar /><AddEmergencyContact /></>} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </>
        )}
      </Routes>
      {isAuthenticated && <Footer />}
    </Router>
  );
};

export default App;

