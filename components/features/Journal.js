import { useState, useEffect, useRef } from "react";
import axios from "axios";
import WebcamComponent from "./Camera";

import { format, startOfMonth, endOfMonth, getMonth, getYear } from "date-fns";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
import { Box } from "@mui/joy";
import Calendar from "./Calendar";

const Journal = () => {
  const userData = useSelector(selectUserData);

  const [weight, setWeight] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const prevDateRef = useRef();

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const fetchUserEntry = async () => {
    if (!userData._id) return;
    setWeight("");
    setPhotos([]);

    try {
      // Using date-fns to format the date
      const formattedDate = format(date, "yyyy-MM-dd");
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

  const fetchMonthEntries = async () => {
    if (!userData._id) return;

    try {
      // Assuming 'date' is the date object for the current month you're interested in
      // Calculate the start and end of the month for 'date'
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      // Format startDate and endDate to YYYY-MM-DD format for the API call
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/journal/entries-range?userId=${userData._id}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      !prevDateRef.current ||
      getMonth(prevDateRef.current) !== getMonth(date) ||
      getYear(prevDateRef.current) !== getYear(date)
    ) {
      fetchMonthEntries();
    }
    prevDateRef.current = date;
  }, [date, userData._id]);

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Calendar
        handleDateChange={handleDateChange}
        date={date}
        entries={entries}
      />
      <Box
        sx={{
          width: "100%",
          maxWidth: "sm",
          p: 3,
          m: 2,
        }}
      >
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
      </Box>
    </Box>
  );
};

export default Journal;
