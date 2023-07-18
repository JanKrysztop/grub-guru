import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const WebcamComponent = ({ photos, setPhotos }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
  }, [webcamRef, setPhotos]);

  const deletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button
        onClick={capture}
        className={`mt-4 px-4 my-4 py-2 rounded w-64 ${
          photos.length >= 4
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700 text-white"
        }`}
        disabled={photos.length >= 4}
      >
        Capture photo
      </button>
      <div className="flex space-x-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative">
            <img
              src={photo}
              alt={`Captured ${index}`}
              className="object-cover w-32 h-32 rounded"
            />
            <button
              onClick={() => deletePhoto(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebcamComponent;
