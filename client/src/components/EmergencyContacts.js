import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path as necessary

const EmergencyContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        return;
      }
      const response = await axios.get('/auth/emergency-contacts', {
        headers: { 'x-access-token': token }
      });
      setContacts(response.data.emergencyContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setError('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleMessage = (phoneNumber) => {
    window.location.href = `sms:${phoneNumber}`;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contacts-container">
      <h3>Emergency Contacts</h3>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
        <ul>
          {contacts.map((contact, index) => (
            <li key={index} className="contact-item">
              {contact.name}
              <button
                className="btn"
                onClick={() => handleCall(contact.phoneNumber)}
              >
                Call
              </button>
              <button
                className="btn"
                onClick={() => handleMessage(contact.phoneNumber)}
              >
                Message
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmergencyContacts;
