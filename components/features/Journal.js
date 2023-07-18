import { useState } from "react";
import WebcamComponent from "./Camera";
const Journal = () => {
  const [weight, setWeight] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">
        Bodyweight Journal
      </h1>
      <form className="flex flex-col items-center w-full max-w-md">
        <input
          type="number"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Enter your weight"
          className="px-3 py-2 mb-4 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        />
      </form>
      <button
        onClick={() => setShowCamera(true)}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Take a Photo
      </button>
      {showCamera && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <WebcamComponent photos={photos} setPhotos={setPhotos} />
            <button
              onClick={() => setShowCamera(false)}
              className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
            >
              Close Camera
            </button>
          </div>
        </div>
      )}
      <div className="flex space-x-4 mt-4">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Captured ${index}`}
            className="w-full h-32"
          />
        ))}
      </div>
    </div>
  );
};

export default Journal;
