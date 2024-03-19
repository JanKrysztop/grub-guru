//THIS COMPONENT IS CURRENTLY UNUSED

import { createWorker } from "tesseract.js";
import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

const OCRComponent = () => {
  const webcamRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [ocrText, setOcrText] = useState("");
  const [worker, setWorker] = useState(null);

  useEffect(() => {
    (async () => {
      const localWorker = await createWorker({
        logger: (m) => console.log(m),
      });
      console.log("Worker created", !!localWorker);
      setWorker(localWorker);
    })();
  }, []);

  const base64ToBlob = (base64) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: "image/jpeg" });
  };

  const recognizeImage = async (base64Image) => {
    if (worker) {
      console.log("Worker exists, starting Tesseract");
      const blob = base64ToBlob(base64Image);

      await worker.loadLanguage("eng");
      await worker.initialize("eng");

      const {
        data: { text },
      } = await worker.recognize(blob);

      setOcrText(text);
      console.log(text);
      await worker.terminate();
    } else {
      console.log("Worker does not exist yet");
    }
  };

  const capture = useCallback(() => {
    console.log("Capture start");
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
    recognizeImage(imageSrc); // Pass the captured image to recognizeImage
  }, [webcamRef, setPhotos, worker]);

  const deletePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
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
      <p className="mt-4">{ocrText}</p>
    </div>
  );
};

export default OCRComponent;
