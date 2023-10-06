import { useState, useEffect } from "react";
import axios from "axios";
import WebcamComponent from "./Camera";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

const Journal = () => {
  const [weight, setWeight] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState(new Date());
  const [userId, setUserId] = useState(null);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // fetchConsumedFoods(selectedDate);
    // code to update dailyNutrients based on the selected date
  };
  //TODO: create this function in one place in application there are duplicates
  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get(
          `https://7foiszp0t0.execute-api.eu-north-1.amazonaws.com/dev/users/me`,
          {
            withCredentials: true,
          }
        );
        console.log("User ID:", response.data); // Adjust depending on how the data is structured in the response
        setUserId(response.data.userId);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  }, []);

  const fetchUserEntry = async () => {
    if (!userId) return;
    setWeight("");
    setPhotos([]);
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(
        `https://7foiszp0t0.execute-api.eu-north-1.amazonaws.com/dev/journal/entry?userId=${userId}&date=${formattedDate}`
      );
      console.log(response.data);
      setWeight(response.data.weight);
      setPhotos(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserEntry();
  }, [date, userId]);
  const handleCreateEntry = async () => {
    try {
      const payload = {
        userId: userId,
        date: date,
        weight: weight,
        photos: photos,
      };
      const response = await axios.post(
        `https://7foiszp0t0.execute-api.eu-north-1.amazonaws.com/dev/journal/create`,
        payload
      );
      console.log("Entry created:", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="mb-6 text-3xl font-bold text-gray-700">
        Bodyweight Journal
      </h1>
      <DatePicker onChange={handleDateChange} value={date} />
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
      <button
        onClick={handleCreateEntry}
        className="mt-4 px-4 py-2 text-white bg-red-500 rounded hover:bg-red-700"
      >
        Save entry
      </button>
    </div>
  );
};

export default Journal;
