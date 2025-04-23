
import React, { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
} from 'mdb-react-ui-kit';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [place, setPlace] = useState('');
  const [country, setCountry] = useState('');
  const [code, setCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { 
        username, 
        password, 
        contactDetails: { 
          street, 
          additionalInfo, 
          zipCode, 
          place, 
          country, 
          code, 
          phoneNumber, 
          email 
        } 
      });
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page after registration
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Registration failed.');
    }
  };

  return (
    <MDBContainer fluid className='h-custom'>
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol md='8' className='my-5'>
          <MDBCard className='card-registration card-registration-2'>
            <MDBCardBody className='p-5'>
              <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>General Information</h3>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Username' 
                size='lg' 
                type='text'
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required
              />
              <MDBInput 
                wrapperClass='mb-4' 
                label='Password' 
                size='lg' 
                type='password'
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
              <h3 className="fw-normal mb-5" style={{ color: '#4835d4' }}>Contact Details</h3>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Street + Nr' 
                size='lg' 
                type='text'
                value={street} 
                onChange={(e) => setStreet(e.target.value)}
                required
              />
              <MDBInput 
                wrapperClass='mb-4' 
                label='Additional Information' 
                size='lg' 
                type='text'
                value={additionalInfo} 
                onChange={(e) => setAdditionalInfo(e.target.value)}
                required
              />
              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput 
                    wrapperClass='mb-4' 
                    label='Zip Code' 
                    size='lg' 
                    type='text'
                    value={zipCode} 
                    onChange={(e) => setZipCode(e.target.value)}
                    required
                  />
                </MDBCol>
                <MDBCol md='6'>
                  <MDBInput 
                    wrapperClass='mb-4' 
                    label='Place' 
                    size='lg' 
                    type='text'
                    value={place} 
                    onChange={(e) => setPlace(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Country' 
                size='lg' 
                type='text'
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                required
              />
              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput 
                    wrapperClass='mb-4' 
                    label='Code +' 
                    size='lg' 
                    type='text'
                    value={code} 
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </MDBCol>
                <MDBCol md='6'>
                  <MDBInput 
                    wrapperClass='mb-4' 
                    label='Phone Number' 
                    size='lg' 
                    type='text'
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput 
                wrapperClass='mb-4' 
                label='Your Email' 
                size='lg' 
                type='email'
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MDBBtn color='primary' size='lg' className='btn-animate' onClick={handleSubmit}>
                Register
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4' className='text-center my-5'>
          <img 
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" 
            className="img-fluid" 
            alt="Contact Details" 
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Register;

