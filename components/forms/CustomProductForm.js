import axios from "axios";
import React, { useState, useEffect } from "react";
//TODO: consider using this not as route but as modal????
const CustomProductForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    label: "",
    ENERC_KCAL: "",
    CHOCDF: "",
    PROCNT: "",
    FAT: "",
    servingSize: "",
  });
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}/users/me`,
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const customFood = {
        ...formData,
        energyNutrient: parseFloat(formData.ENERC_KCAL),
        nutrients: {
          ENERC_KCAL: parseFloat(formData.ENERC_KCAL),
          CHOCDF: parseFloat(formData.CHOCDF),
          PROCNT: parseFloat(formData.PROCNT),
          FAT: parseFloat(formData.FAT),
        },
        userId: userId,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/custom-food/add`,
        customFood
      );

      console.log("added food", response.data);

      setFormData({
        label: "",
        ENERC_KCAL: "",
        CHOCDF: "",
        PROCNT: "",
        FAT: "",
        servingSize: "",
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="label"
          >
            Food Name
          </label>
          <input
            type="text"
            name="label"
            value={formData.label}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E.g. Banana"
            required
          />
        </div>

        {/* You can replicate this structure for other nutrients */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ENERC_KCAL"
          >
            Calories (ENERC_KCAL)
          </label>
          <input
            type="number"
            name="ENERC_KCAL"
            value={formData.ENERC_KCAL}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E.g. 100"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="CHOCDF"
          >
            Carbs (CHOCDF)
          </label>
          <input
            type="number"
            name="CHOCDF"
            value={formData.CHOCDF}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E.g. 100"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="PROCNT"
          >
            Protein (PROCNT)
          </label>
          <input
            type="number"
            name="PROCNT"
            value={formData.PROCNT}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E.g. 100"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="FAT"
          >
            Fat (FAT)
          </label>
          <input
            type="number"
            name="FAT"
            value={formData.FAT}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E.g. 100"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="servingSize"
          >
            servingSize (g)
          </label>
          <input
            type="number"
            name="servingSize"
            value={formData.servingSize}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="E.g. 100"
          />
        </div>

        {/* ... Repeat for CHOCDF, PROCNT, and FAT ... */}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Custom Food
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomProductForm;
