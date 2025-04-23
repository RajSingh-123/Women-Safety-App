import React, { useState } from 'react';
import axios from '../axiosConfig'; // Adjust the path as necessary

const AddEmergencyContact = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      await axios.post('/auth/add-emergency-contact', { name, phoneNumber }, {
        headers: { 'x-access-token': token }
      });
      setMessage('Emergency contact added successfully');
      setName('');
      setPhoneNumber('');
    } catch (error) {
      console.error('Error adding contact:', error);
      setMessage('Error adding contact');
    }
  };

  return (
    <div>
      <h2>Add Emergency Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contact Name"
          required
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddEmergencyContact;
