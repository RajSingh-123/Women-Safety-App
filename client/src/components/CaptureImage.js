import React, { useRef, useState, useEffect } from 'react';
import axios from '../axiosConfig'; // Adjust the path if necessary

const CaptureImage = ({ onImageCaptured }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [image, setImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (cameraActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch(err => {
          console.error('Error accessing camera:', err);
          alert('Error accessing camera. Please check your permissions and ensure no other application is using the camera.');
        });
    }
  }, [cameraActive]);

  const startCamera = () => {
    setCameraActive(true);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) {
      console.error('Video or canvas reference is not available');
      return;
    }

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    setImage(imageData);
    setCameraActive(false);

    // Stop camera stream
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Send image to server
    sendImageToServer(imageData);

    if (onImageCaptured) {
      onImageCaptured(imageData);
    } else {
      console.error('onImageCaptured callback is not provided');
    }
  };

  const sendImageToServer = async (imageData) => {
    try {
      const token = localStorage.getItem('authToken'); // Or get the token from wherever you store it
      const response = await axios.post('/upload-image', { image: imageData }, {
        headers: { 'x-access-token': token },
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response.data); // Handle response
    } catch (error) {
      console.error('Error uploading image to server:', error);
    }
  };

  const downloadImage = () => {
    if (!image) {
      console.error('No image to download');
      return;
    }

    const link = document.createElement('a');
    link.href = image;
    link.download = 'captured-image.jpg'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      {!cameraActive && <button onClick={startCamera}>Open Camera</button>}
      {cameraActive && (
        <div>
          <video ref={videoRef} width="240" height="240" />
          <button onClick={captureImage}>Capture</button>
        </div>
      )}
        {image && (
        <div>
          <img src={image} alt="Captured" />
          <button onClick={downloadImage}>Download Image</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default CaptureImage;
