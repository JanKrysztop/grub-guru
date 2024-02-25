import BMI from "../features/BMI";
import WHR from "../features/WHR";
import BMR from "../features/BMR";
import TDEE from "../features/TDEE";

import { Box, ToggleButtonGroup, Button } from "@mui/joy";

import { useState } from "react";

const Calculator = () => {
  const [currentCalculator, setCurrentCalculator] = useState("BMI");

  const renderCalculator = () => {
    switch (currentCalculator) {
      case "BMI":
        return <BMI />;
      case "WHR":
        return <WHR />;
      case "TDEE":
        return <TDEE />;
      case "BMR":
        return <BMR />;
      default:
        return "BMI";
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
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          maxWidth: "sm",
          p: 3,
          m: 2,
        }}
      >
        {" "}
        <ToggleButtonGroup
          onChange={(event, newValue) => {
            setCurrentCalculator(newValue);
          }}
          className="mb-7"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          required
        >
          <Button
            value="BMI"
            sx={{
              width: "80px ",
              height: "40px ",
              borderRadius: "16px",
              // backgroundColor: "#292B29",
              ...(currentCalculator === "BMI" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            BMI{" "}
          </Button>
          <Button
            value="WHR"
            sx={{
              width: "80px ",
              height: "40px ",
              borderRadius: "16px !important",
              // backgroundColor: "#292B29",
              ...(currentCalculator === "WHR" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            WHR{" "}
          </Button>
          <Button
            value="BMR"
            sx={{
              width: "80px ",
              height: "40px ",
              borderRadius: "16px !important",
              // backgroundColor: "#292B29",
              ...(currentCalculator === "BMR" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            BMR{" "}
          </Button>
          <Button
            value="TDEE"
            sx={{
              width: "80px ",
              height: "40px ",
              borderRadius: "16px",
              // backgroundColor: "#292B29",
              ...(currentCalculator === "TDEE" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            TDEE{" "}
          </Button>
        </ToggleButtonGroup>
        {renderCalculator()}
      </Box>
    </Box>
  );
};

export default Calculator;
