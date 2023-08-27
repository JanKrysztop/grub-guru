import CustomProductForm from "../forms/CustomProductForm";
import OCRComponent from "../features/caloriesTracker/OCRComponent";
import { useState } from "react";
const NewProductModal = ({ isOpen, onClose, onAdd }) => {
  const [showCameraMode, setShowCameraMode] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* This is the overlay */}
      <div className="modal-content bg-white p-6 rounded shadow-lg z-10 w-96">
        <OCRComponent />
        <CustomProductForm onClose={onClose} />
      </div>
    </div>
  );
};

export default NewProductModal;
