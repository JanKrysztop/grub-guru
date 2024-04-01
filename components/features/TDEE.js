import { useState } from "react";
import { useSelector } from "react-redux";
import { selectBmrFormulas } from "@/redux/bmrSlice";
import { selectActivityLevels } from "@/redux/activitySlice";
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
  Select,
  Option,
} from "@mui/joy";
import { FemaleRounded, MaleRounded } from "@mui/icons-material";

const TdeeCalculator = ({ backgroundColor }) => {
  const bmrFormulas = useSelector(selectBmrFormulas);
  const activityLevels = useSelector(selectActivityLevels);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [bmr, setBmr] = useState(null);
  const [formula, setFormula] = useState("Harris");
  const [activity, setActivity] = useState(activityLevels[0].value);
  const [tdee, setTdee] = useState(null);

  const calculateBMR = () => {
    let calculatedBmr = 0;
    if (formula === "Harris") {
      if (gender === "male") {
        calculatedBmr = 13.397 * weight + 4.799 * height - 6.677 * age + 88.362;
        setBmr(calculatedBmr.toFixed(2));
      } else {
        calculatedBmr = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
        setBmr(calculatedBmr.toFixed(2));
      }
    } else {
      if (gender === "male") {
        calculatedBmr = 10 * weight + 6.25 * height - 5 * age + 5;
        setBmr(calculatedBmr.toFixed(2));
      } else {
        calculatedBmr = 10 * weight + 6.25 * height - 5 * age - 161;
        setBmr(calculatedBmr.toFixed(2));
      }
    }
  };
  const calculateTDEE = (event) => {
    event.preventDefault();
    const calculatedBmr = bmrFormulas[formula][gender](weight, height, age);
    setBmr(calculatedBmr.toFixed(2));

    // Calculate TDEE
    const calculatedTdee = calculatedBmr * activity;
    setTdee(calculatedTdee.toFixed(2));
  };
  // useEffect(() => {
  //   if (weight && height && age && bmrFormulas[formula][gender]) {
  //     const calculatedBmr = bmrFormulas[formula][gender](weight, height, age);
  //     setBmr(calculatedBmr.toFixed(2));

  //     // Calculate TDEE
  //     const calculatedTdee = calculatedBmr * activity;
  //     setTdee(calculatedTdee.toFixed(2));
  //   }
  // }, [weight, height, age, gender, formula, activity]);

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
          <AccordionSummary>Understanding the TDEE Calculator</AccordionSummary>
          <AccordionDetails>
            Total Daily Energy Expenditure (TDEE) is the total number of
            calories you burn each day, accounting for all activities, including
            exercising, working, and even resting. It is a critical measure for
            anyone looking to manage their weight, whether they aim to lose,
            gain, or maintain it. TDEE is primarily based on your Basal
            Metabolic Rate (BMR) but also includes calories expended through
            physical activity and the thermic effect of food. To calculate TDEE,
            you first determine your BMR using equations like the Mifflin-St
            Jeor or the Revised Harris-Benedict, depending on your BMI. Then,
            you adjust this number based on your activity level, ranging from
            sedentary to extra active. For instance, if your BMR is 1500
            calories and you have a moderate activity level, your TDEE might be
            around 2250 calories a day. Understanding and accurately calculating
            your TDEE is essential for creating a diet plan that aligns with
            your fitness goals, ensuring you consume the right amount of
            calories to support your lifestyle and activity level.
            <strong>
              If your BMI is equal or greater then 30 you should use Mifflin-St
              Jeor Equation, otherwise use Revised Harris-Benedict Equation
            </strong>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
      <Box
        component="form"
        onSubmit={calculateTDEE}
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
        <Select
          value={activity}
          onChange={(e, newValue) => setActivity(newValue)}
          sx={{ width: "100%", mb: 3, backgroundColor: backgroundColor }}
        >
          {activityLevels.map((level) => (
            <Option key={level.id} value={level.value} label={level.mainText}>
              <Box component="span" sx={{ display: "block" }}>
                <Typography component="span" level="title-sm">
                  {level.mainText}
                </Typography>
                <Typography level="body-xs">{level.secondaryText}</Typography>
              </Box>
            </Option>
          ))}
        </Select>
        <CustomButton type="submit">Calculate TDEE</CustomButton>

        {tdee && (
          //     <div>
          //       <p>
          //         Your TDEE is <span className="text-green-500">{tdee}</span>{" "}
          //         Calories/day
          //       </p>
          //     </div>
          //   )}
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                mt: 2,
                mb: 1,
              }}
            >
              Your TDEE is {tdee} Calories/day
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TdeeCalculator;
