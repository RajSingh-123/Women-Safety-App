import React, { useState } from 'react';

const LocationDisplay = () => {
  const [location, setLocation] = useState(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="location-container">
      <h3>Your Current Location</h3>
      {location ? (
        <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
      ) : (
        <p>Location not available</p>
      )}
      <button onClick={handleGetLocation} className="btn">Get Location</button>
    </div>
  );
};

export default LocationDisplay;
