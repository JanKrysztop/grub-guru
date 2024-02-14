import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import Button from "@mui/joy/Button";
import CustomButton from "@/components/ui/CustomButton";
const StepTwo = ({ onPrev, onNext, goal, setGoal }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: "100%",
        maxWidth: "sm",
        p: 3,
        m: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
          fontWeight: "bold",
          mb: 5,
        }}
      >
        What do you want to do?
      </Typography>
      <ToggleButtonGroup
        value={goal}
        onChange={(event, newValue) => {
          setGoal(newValue);
        }}
        spacing={2}
        // variant="soft"
        className="mb-7"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        required
      >
        <Button
          value="lose"
          sx={{
            width: "100% ",
            height: "40px ",
            borderRadius: "16px",

            // backgroundColor: "#292B29",
            ...(goal === "lose" && {
              backgroundColor: "#F7D9BB!important",
              color: "#E78B01",
              border: "2px solid #E78B01 !important",
            }),
          }}
        >
          Lose Wieght
        </Button>
        <Button
          value="maintain"
          sx={{
            width: "100% ",
            height: "40px ",
            borderRadius: "16px !important",
            // backgroundColor: "#292B29",
            ...(goal === "maintain" && {
              backgroundColor: "#F7D9BB!important",
              color: "#E78B01",
              border: "2px solid #E78B01 !important",
            }),
          }}
        >
          Maintain Wieght
        </Button>
        <Button
          value="gain"
          sx={{
            width: "100% ",
            height: "40px ",
            borderRadius: "16px",
            // backgroundColor: "#292B29",
            ...(goal === "gain" && {
              backgroundColor: "#F7D9BB!important",
              color: "#E78B01",
              border: "2px solid #E78B01 !important",
            }),
          }}
        >
          Gain Wieght
        </Button>
      </ToggleButtonGroup>
      <CustomButton sx={{ mb: 3 }} onClick={onNext} disabled={!goal}>
        Next
      </CustomButton>
      <CustomButton onClick={onPrev} styleType="secondary">
        Previous
      </CustomButton>
    </Box>
  );
};

export default StepTwo;
