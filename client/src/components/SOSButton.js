// import React, { useState } from 'react';
// import axios from '../axiosConfig'; // Make sure this points to your axios instance
// import Webcam from 'react-webcam';

// const SOSButton = () => {
//   const [location, setLocation] = useState(null);
//   const [image, setImage] = useState(null);
//   const webcamRef = React.useRef(null);

//   const capture = React.useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//   }, [webcamRef]);

//   const handleSOSClick = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ latitude, longitude });

//         // Capture the image from webcam
//         capture();

//         try {
//           // Post SOS request with location and image
//           const formData = new FormData();
//           formData.append('image', image);
//           formData.append('latitude',latitude);
//           formData.append('longitude',longitude);
          
//           await axios.post('/sos/trigger', { 
//             location, 
//             message: 'SOS Alert!' 
//           }, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//           });

//           alert('SOS Triggered!');
//         } catch (error) {
//           console.error(error);
//           alert('Failed to send SOS alert.');
//         }
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   return (
//     <div className="sos-button-container">
//       <h1>Women Safety SOS</h1>
//       <Webcam
//         audio={false}
//         ref={webcamRef}
//         screenshotFormat="image/jpeg"
//         width="100%"
//       />
//       <button onClick={capture}>Capture Photo</button>
//       <button onClick={handleSOSClick} className="sos-button">
//         Trigger SOS
//       </button>
      
//       {location && (
//         <p>
//           Current Location: Latitude {location.latitude}, Longitude {location.longitude}
//         </p>
//       )}
//     </div>
//   );
// };

// export default SOSButton;

import React, { useState } from 'react';
import axios from '../axiosConfig'; // Make sure this points to your axios instance

const SOSButton = () => {
  const [location, setLocation] = useState(null);

  const handleSOSClick = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          // Post SOS request with location only
          await axios.post('/sos/trigger', { 
            location, 
            message: 'SOS Alert!' 
          });

          alert('SOS Triggered!');
        } catch (error) {
          console.error(error);
          alert('Failed to send SOS alert.');
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="sos-button-container">
      <h1>Women Safety SOS</h1>
      <button onClick={handleSOSClick} className="sos-button">
        Trigger SOS
      </button>
      
      {location && (
        <p>
          Current Location: Latitude {location.latitude}, Longitude {location.longitude}
        </p>
      )}
    </div>
  );
};

export default SOSButton;

