import { useState } from "react";

const Journal = () => {
  const [weight, setWeight] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handlePhotoClick = () => {
    // Here you would normally integrate with a camera API to take a photo
    // For simplicity, we'll just simulate this with a placeholder image
    setPhoto("https://via.placeholder.com/150");
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
        <button
          type="button"
          onClick={handlePhotoClick}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Take a photo
        </button>
        {photo && (
          <div className="mt-4">
            <img src={photo} alt="User's progress" className="rounded shadow" />
          </div>
        )}
      </form>
    </div>
  );
};

export default Journal;
