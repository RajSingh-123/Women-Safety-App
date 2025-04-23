import React, { useRef, useState } from 'react';

const RecordMedia = () => {
  const [recording, setRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState('');
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const url = URL.createObjectURL(event.data);
          setMediaBlobUrl(url);
        }
      };
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing media devices.', err);
      alert('Error accessing media devices. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);

      // Stop all tracks in the stream
      const stream = videoRef.current.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  const downloadMedia = () => {
    if (!mediaBlobUrl) {
      console.error('No media to download');
      return;
    }

    const link = document.createElement('a');
    link.href = mediaBlobUrl;
    link.download = 'recording.webm'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1>Record Video and Audio</h1>
      <video ref={videoRef} autoPlay playsInline muted width="640" height="480" />
      <div>
        {!recording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      {mediaBlobUrl && (
        <div>
          <video src={mediaBlobUrl} controls width="640" height="480" />
          <button onClick={downloadMedia}>Download Recording</button>
        </div>
      )}
    </div>
  );
};

export default RecordMedia;
