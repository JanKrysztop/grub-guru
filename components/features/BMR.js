import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBmrFormulas } from "@/redux/bmrSlice";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import {
  Box,
  AccordionGroup,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButtonGroup,
  Button,
  Typography,
} from "@mui/joy";
import { FemaleRounded, MaleRounded } from "@mui/icons-material";

const BmrCalculator = ({ backgroundColor }) => {
  const bmrFormulas = useSelector(selectBmrFormulas);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmr, setBmr] = useState(null);
  const [formula, setFormula] = useState("Harris");

  const calculateBMR = (event) => {
    event.preventDefault();
    const calculatedBmr = bmrFormulas[formula][gender](weight, height, age);
    setBmr(calculatedBmr.toFixed(2));
  };

  // useEffect(() => {
  //   if (weight && height && age && bmrFormulas[formula][gender]) {
  //     const calculatedBmr = bmrFormulas[formula][gender](weight, height, age);
  //     setBmr(calculatedBmr.toFixed(2));
  //   }
  // }, [weight, height, age, gender, formula]);

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
          <AccordionSummary>Understanding the BMR Calculator</AccordionSummary>
          <AccordionDetails>
            The Basal Metabolic Rate (BMR) is a measure of the number of
            calories your body needs to perform basic life-sustaining functions,
            such as breathing, circulation, cell production, and nutrient
            processing. It&apos;s an essential metric for anyone looking to
            understand their metabolic health, manage their weight, or calculate
            their dietary needs. The BMR is calculated based on several factors,
            including age, sex, weight, and height, providing a personalized
            daily calorie requirement. For example, a person&apos;s BMR
            calculation might reveal they need 1500 calories a day to maintain
            their body&apos;s basic functions at rest. Knowing your BMR can help
            tailor dietary and exercise plans to increase or decrease weight.
            It&apos;s a fundamental tool for achieving fitness goals, whether
            they involve weight loss, muscle gain, or maintaining a healthy
            weight.{" "}
            <strong>
              If your BMI is equal or greater then 30 you should use Mifflin-St
              Jeor Equation, otherwise use Revised Harris-Benedict Equation
            </strong>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
      <Box
        component="form"
        onSubmit={calculateBMR}
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
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="mb-7"
          required
        />
        <CustomInput
          type="number"
          placeholder="Height in cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="mb-7"
          required
        />
        <CustomInput
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mb-7"
          required
        />
        <ToggleButtonGroup
          value={gender}
          onChange={(event, newValue) => {
            setGender(newValue);
          }}
          className="mb-7"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          required
        >
          <Button
            value="female"
            sx={{
              width: "180px ",
              height: "40px ",
              borderRadius: "16px",
              backgroundColor: backgroundColor,
              ...(gender === "female" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            Female{" "}
            <FemaleRounded
              sx={{
                ...(gender === "female" && {
                  color: "#E78B01",
                }),
              }}
            />
          </Button>
          <Button
            value="male"
            sx={{
              width: "180px ",
              height: "40px",
              borderRadius: "16px",
              backgroundColor: backgroundColor,
              ...(gender === "male" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            Male{" "}
            <MaleRounded
              sx={{
                ...(gender === "male" && {
                  color: "#E78B01",
                }),
              }}
            />
          </Button>
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={formula}
          onChange={(event, newValue) => {
            setFormula(newValue);
          }}
          className="mb-7"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          required
        >
          <Button
            value="Mifflin"
            sx={{
              width: "180px ",
              height: "40px ",
              borderRadius: "16px",
              backgroundColor: backgroundColor,
              ...(formula === "Mifflin" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            Mifflin St Jeor{" "}
          </Button>
          <Button
            value="Harris"
            sx={{
              width: "180px ",
              height: "40px",
              borderRadius: "16px",
              backgroundColor: backgroundColor,
              ...(formula === "Harris" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            Revised Harris-Benedict{" "}
          </Button>
        </ToggleButtonGroup>
        <CustomButton type="submit">Calculate BMR</CustomButton>

        {bmr && (
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                mt: 2,
                mb: 1,
              }}
            >
              Your BMR is {bmr} calories/day
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BmrCalculator;
