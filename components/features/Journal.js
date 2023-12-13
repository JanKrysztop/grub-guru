import { useState, useEffect } from "react";
import axios from "axios";
import WebcamComponent from "./Camera";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";

const Journal = () => {
  const userData = useSelector(selectUserData);

  const [weight, setWeight] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState(new Date());

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // fetchConsumedFoods(selectedDate);
    // code to update dailyNutrients based on the selected date
  };

  const fetchUserEntry = async () => {
    if (!userData._id) return;
    setWeight("");
    setPhotos([]);
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/journal/entry?userId=${userData._id}&date=${formattedDate}`
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
  }, [date, userData._id]);
  const handleCreateEntry = async () => {
    try {
      const payload = {
        userId: userData._id,
        date: date,
        weight: weight,
        photos: photos,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/journal/create`,
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
