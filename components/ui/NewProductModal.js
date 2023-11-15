import CustomProductForm from "../forms/CustomProductForm";
import OCRComponent from "../features/caloriesTracker/OCRComponent";
import BarcodeScannerComponent from "../features/caloriesTracker/BarcodeScannerComponent";
import { useState, useCallback } from "react";
import axios from "axios";
const NewProductModal = ({ isOpen, onClose, onAdd }) => {
  const [showCameraMode, setShowCameraMode] = useState(false);

  //This part is currently not functional
  // const handleBarcodeDetected = useCallback((data) => {
  //   console.log(data); // This is the barcode number
  //   fetchProductByEAN(data.codeResult.code);
  // }, []);

  // const fetchProductByEAN = async (ean) => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.NEXT_PUBLIC_MAIN_URL}/food-search`,
  //       { params: { ean } }
  //     );
  //     if (!response.status === 200) {
  //       console.log(response);
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = response.data;
  //     // Check if the product exists in the response
  //     if (data.hints && data.hints.length > 0) {
  //       return data.hints[0]; // or process the data as needed
  //     } else {
  //       return null; // No product found
  //     }
  //   } catch (error) {
  //     console.error("Error fetching product data:", error);
  //     return null;
  //   }
  // };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* This is the overlay */}
      <div className="modal-content bg-white p-6 rounded shadow-lg z-10 w-96">
        {showCameraMode ? (
          <>
            <button
              onClick={() => setShowCameraMode(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Type in
            </button>
            {/* <OCRComponent /> */}
            {/* <BarcodeScannerComponent onDetected={handleBarcodeDetected} /> */}
          </>
        ) : (
          <>
            {/* <button
              onClick={() => setShowCameraMode(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Camera mode
            </button> */}
            <CustomProductForm onClose={onClose} />
          </>
        )}
      </div>
    </div>
  );
};

export default NewProductModal;
