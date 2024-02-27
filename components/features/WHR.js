import { useState } from "react";
import { Box } from "@mui/joy";
import AccordionGroup from "@mui/joy/AccordionGroup";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionSummary from "@mui/joy/AccordionSummary";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import { Button } from "@mui/joy";
import { Female } from "@mui/icons-material";
import { Male } from "@mui/icons-material";
import Typography from "@mui/joy/Typography";

const WhrCalculator = () => {
  const [gender, setGender] = useState("female");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");
  const [whr, setWhr] = useState(null);
  const [whrCategory, setWhrCategory] = useState("");
  const [icon, setIcon] = useState("");

  const calculateWHR = (event) => {
    event.preventDefault();
    const calculatedWhr = (waist / hip).toFixed(2);
    setWhr(calculatedWhr);

    if (gender === "female") {
      if (calculatedWhr < 0.8) {
        setWhrCategory("low health risk");
        setIcon("pear");
      } else {
        setWhrCategory("high tisk");
        setIcon("apple");
      }
    } else {
      if (calculatedWhr < 1) {
        setWhrCategory("low health risk");
        setIcon("pear");
      } else {
        setWhrCategory("high health risk");
        setIcon("apple");
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
          <AccordionSummary>Understanding the WHR Calculator</AccordionSummary>
          <AccordionDetails>
            The Waist-to-Hip Ratio (WHR) is a vital measure used to understand
            body fat distribution and the associated health risks. It&apos;s
            calculated by dividing an individual&apos;s waist circumference in
            centimeters (or inches) by their hip circumference in centimeters
            (or inches). This simple calculation helps identify whether you have
            an apple or pear body shape, which can indicate your risk for
            certain health conditions. An apple-shaped body, indicated by a
            higher WHR, suggests more fat is stored around the waist, which is
            associated with a higher risk of heart disease, diabetes, and
            stroke. Conversely, a pear-shaped body, signified by a lower WHR,
            means fat is more distributed around the hips and buttocks,
            generally considered healthier. For example, if a person&apos;s
            waist measures 70cm and hips measure 100cm, their WHR would be 0.7,
            indicating a pear-shaped body.
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>

      <Box
        component="form"
        onSubmit={calculateWHR}
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
          name="waist"
          placeholder="Waist in cm"
          value={waist}
          onChange={(e) => setWaist(e.target.value)}
          className="mb-7"
          required
        />
        <CustomInput
          type="number"
          name="hip"
          placeholder="Hip in cm"
          value={hip}
          onChange={(e) => setHip(e.target.value)}
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
              // backgroundColor: "#292B29",
              ...(gender === "female" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            Female{" "}
            <Female
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
              // backgroundColor: "#292B29",
              ...(gender === "male" && {
                backgroundColor: "#F7D9BB!important",
                color: "#E78B01",
                border: "2px solid #E78B01 !important",
              }),
            }}
          >
            Male{" "}
            <Male
              sx={{
                ...(gender === "male" && {
                  color: "#E78B01",
                }),
              }}
            />
          </Button>
        </ToggleButtonGroup>

        <CustomButton type="submit">Calculate WHR</CustomButton>
        {whr && (
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                mt: 2,
                mb: 1,
              }}
            >
              Your WHR is {whr}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
                mb: 1,
              }}
            >
              WHR category is {whrCategory}
            </Typography>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Body shape: {icon}
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <img
                src={`/${icon}.svg`}
                alt="Shape Icon"
                style={{ width: "225px", height: "200px" }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WhrCalculator;
