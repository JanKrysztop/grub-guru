import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { Box, Typography } from "@mui/joy";

const CustomProductForm = ({ setShowNewProduct, snackbar, setSnackbar }) => {
  const userData = useSelector(selectUserData);

  const [formData, setFormData] = useState({
    label: "",
    ENERC_KCAL: "",
    CHOCDF: "",
    PROCNT: "",
    FAT: "",
    servingSize: "",
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
        userId: userData._id,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/custom-food/add`,
        customFood
      );

      console.log("added food", response.data);

      setShowNewProduct(false);
      setSnackbar({
        open: true,
        type: "success",
        message: "New product successfully created!",
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to create new product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <label htmlFor="label">
        <Typography sx={{ mb: 1 }}>Food Name</Typography>
      </label>
      <CustomInput
        type="text"
        id="label"
        name="label"
        value={formData.label}
        onChange={handleInputChange}
        placeholder="E.g. Banana"
        className="mb-2"
      />
      <label htmlFor="ENERC_KCAL">
        <Typography sx={{ mb: 1 }}>Calories</Typography>
      </label>
      <CustomInput
        type="number"
        name="ENERC_KCAL"
        id="ENERC_KCAL"
        value={formData.ENERC_KCAL}
        onChange={handleInputChange}
        placeholder="E.g. 100"
        className="mb-2"
      />
      <label htmlFor="CHOCDF">
        <Typography sx={{ mb: 1 }}>Carbs</Typography>
      </label>
      <CustomInput
        type="number"
        name="CHOCDF"
        id="CHOCDF"
        value={formData.CHOCDF}
        onChange={handleInputChange}
        placeholder="E.g. 100"
        className="mb-2"
      />
      <label htmlFor="PROCNT">
        <Typography sx={{ mb: 1 }}>Protein</Typography>
      </label>
      <CustomInput
        type="number"
        name="PROCNT"
        id="PROCNT"
        value={formData.PROCNT}
        onChange={handleInputChange}
        placeholder="E.g. 100"
        className="mb-2"
      />
      <label htmlFor="FAT">
        <Typography sx={{ mb: 1 }}>Fat</Typography>
      </label>
      <CustomInput
        type="number"
        name="FAT"
        id="FAT"
        value={formData.FAT}
        onChange={handleInputChange}
        placeholder="E.g. 100"
        className="mb-2"
      />
      <label htmlFor="servingSize">
        <Typography sx={{ mb: 1 }}>Serving size (g)</Typography>
      </label>
      <CustomInput
        type="number"
        name="servingSize"
        id="servingSize"
        value={formData.servingSize}
        onChange={handleInputChange}
        placeholder="E.g. 100"
        className="mb-14"
      />

      <CustomButton
        disabled={
          !formData.label ||
          !formData.ENERC_KCAL ||
          !formData.CHOCDF ||
          !formData.PROCNT ||
          !formData.FAT ||
          !formData.servingSize
        }
        type="submit"
        sx={{ marginBottom: 2 }}
        loading={loading}
      >
        Add
      </CustomButton>
      <CustomButton
        type="submit"
        styleType="secondary"
        onClick={() => setShowNewProduct(false)}
      >
        Cancel
      </CustomButton>
    </Box>
  );
};

export default CustomProductForm;
