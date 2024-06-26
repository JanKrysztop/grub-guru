import { useSelector } from "react-redux";
import { selectComponentBackground } from "@/redux/themeSlice";
import CustomButton from "@/components/ui/CustomButton";
import { Box, Typography, Select, Option, Slider } from "@mui/joy";

const StepThree = ({
  onPrev,
  onSubmit,
  weightGoal,
  setWeightGoal,
  activity,
  setActivity,
  activityLevels,
  goal,
  error,
  loading,
}) => {
  const backgroundColor = useSelector(selectComponentBackground);
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
          mb: 3,
        }}
      >
        Select your activity
      </Typography>
      <Select
        value={activity}
        onChange={(e, newValue) => setActivity(newValue)}
        sx={{ width: "90%", mb: 3, backgroundColor: backgroundColor }}
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
      {goal !== "maintain" && (
        <>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "bold",
              mb: 5,
            }}
          >
            Set your goal
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Kilos per week:
          </Typography>

          <Slider
            defaultValue={0}
            value={weightGoal}
            onChange={(e) => setWeightGoal(e.target.value)}
            step={0.1}
            marks
            min={0}
            max={1}
            valueLabelDisplay="on"
            sx={{
              "--Slider-thumbBackground": "#549801",
              "--Slider-thumbColor": "#549801",
              "--Slider-trackBackground": "#549801",
              "&:hover": {
                "--Slider-thumbBackground": "#0D5E33",
                "--Slider-trackBackground": "#0D5E33",
                "--Slider-thumbColor": "#0D5E33",
              },
              ".MuiSlider-thumb": {
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  "--Slider-thumbBackground": "#0D5E33", // Change thumb color when active/hovered
                },
              },
              ".MuiSlider-track": {
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  "--Slider-trackBackground": "#0D5E33", // Change track color when active/hovered
                },
              },
            }}
          />
        </>
      )}
      <CustomButton
        sx={{ my: 3 }}
        onClick={onSubmit}
        disabled={error}
        loading={loading}
      >
        Submit
      </CustomButton>
      <CustomButton onClick={onPrev} styleType="secondary">
        Previous
      </CustomButton>
    </Box>
  );
};

export default StepThree;
