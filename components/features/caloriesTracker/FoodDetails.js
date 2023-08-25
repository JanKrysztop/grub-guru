import axios from "axios";
import { useState } from "react";
import DeleteModal from "../../ui/DeleteModal";
const FoodDetails = ({ food, onAdd }) => {
  const [selectedServingSize, setSelectedServingSize] = useState(
    food?.servingSizes?.[0]
  );
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleServingSizeChange = (e) => {
    const servingSize = food.servingSizes.find(
      (serving) => serving.uri === e.target.value
    );
    setSelectedServingSize(servingSize);
  };

  const handleAddClick = () => {
    onAdd(food, selectedServingSize);
  };
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDelete = (id) => async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/custom-food/${id}`
      );
      closeDeleteModal();
      //TODO: add a reset to food list after this action
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded shadow-lg">
      {food.isCustom && (
        <div>
          <img
            src={`/trash.svg`}
            alt="Trash Icon"
            className="self-end mt-auto"
            onClick={showDeleteModal}
          />
          <DeleteModal
            isOpen={isDeleteModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDelete(food._id)}
          />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">{food.label}</h2>
      <img
        src={food.image}
        alt={food.label}
        className="w-64 h-64 object-cover mb-4"
      />
      <p className="text-lg mb-2">Brand: {food.brand}</p>
      <p className="text-lg mb-2">Category: {food.category}</p>
      <p className="text-lg mb-2">
        Calories: {Math.floor(food.energyNutrient)}
      </p>
      <p className="text-lg mb-2">Carbs: {Math.floor(food.nutrients.CHOCDF)}</p>
      <p className="text-lg mb-2">
        Protein: {Math.floor(food.nutrients.PROCNT)}
      </p>
      <p className="text-lg mb-2">Fat: {Math.floor(food.nutrients.FAT)}</p>
      {/* <p className="text-lg mb-2">
        Ingredients: {food.foodContentsLabel}
      </p> */}
      <div className="mb-4">
        <label className="block text-lg mb-2">
          Serving Size:
          <select
            value={selectedServingSize?.uri}
            onChange={handleServingSizeChange}
            className="block w-full mt-1 rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {food?.servingSizes?.map((servingSize) => (
              <option key={servingSize?.uri} value={servingSize?.uri}>
                {servingSize.label} ({servingSize.quantity})
              </option>
            ))}
          </select>
        </label>
      </div>
      <button
        onClick={handleAddClick}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
      >
        Add to Consumed Foods
      </button>
    </div>
  );
};

export default FoodDetails;
