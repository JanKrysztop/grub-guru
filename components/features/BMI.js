import { useState } from "react";
import { Box } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import Typography from "@mui/joy/Typography";

const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState("");

  const calculateBMI = (event) => {
    event.preventDefault();
    if (weight && height) {
      const heightInMeters = height / 100;
      const calculatedBmi = (
        weight /
        (heightInMeters * heightInMeters)
      ).toFixed(2);
      setBmi(calculatedBmi);

      if (calculatedBmi < 18.5) {
        setBmiCategory("Underweight");
      } else if (calculatedBmi < 24.9) {
        setBmiCategory("Normal wieght");
      } else if (calculatedBmi < 29.9) {
        setBmiCategory("Overweight");
      } else {
        setBmiCategory("Obesity");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <AccordionGroup variant="soft">
        <Accordion>
          <AccordionSummary>Understanding the BMI Calculator</AccordionSummary>
          <AccordionDetails>
            The Body Mass Index (BMI) is a widely used measure to classify
            underweight, normal weight, overweight, and obesity by comparing
            your weight to your height. It&apos;s calculated by dividing your
            weight in kilograms by the square of your height in meters (kg/m²).
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
      <Box
        component="form"
        onSubmit={calculateBMI}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "sm",
          mt: 2,
        }}
      >
        <CustomInput
          type="number"
          name="weight"
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mb-7"
          required
        />
        <CustomInput
          type="number"
          name="height"
          placeholder="Height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mb-7"
          required
        />
        <CustomButton type="submit">Calculate BMI</CustomButton>

        {bmi && (
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                mt: 2,
                mb: 1,
              }}
            >
              Your BMI is {bmi}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                mb: 5,
              }}
            >
              BMI category is {bmiCategory}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BmiCalculator;
