import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import CustomButton from "@/components/ui/CustomButton";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useEffect } from "react";
import Slider from "@mui/joy/Slider";

const StepThree = ({
  onPrev,
  onSubmit,
  weightGoal,
  setWeightGoal,
  activity,
  setActivity,
  activityLevels,
  goal,
}) => {
  const handleChange = (eventOrValue) => {
    console.log(eventOrValue); // Log the first argument to see what's being passed.
    // Then determine how to correctly set the activity based on what's logged.
  };
  useEffect(() => {
    console.log(activity);
  }, [activity]);
  console.log("Current activity state:", activity);
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
        sx={{ width: "100%", mb: 3 }}
      >
        {activityLevels.map((level) => (
          <Option key={level.id} value={level.value}>
            {level.label}
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
          <label htmlFor="weightGoal" className="block mb-2">
            Kilos per week:
          </label>
          <Slider
            defaultValue={0}
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
          <div className="flex items-center mb-4">
            <button
              type="button"
              onClick={() =>
                setWeightGoal((prev) => Math.max(0, prev - 0.1).toFixed(2))
              }
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              -
            </button>
            <input
              type="text"
              id="weightGoal"
              name="weightGoal"
              value={weightGoal}
              onChange={(e) =>
                setWeightGoal(parseFloat(e.target.value).toFixed(2))
              }
              className="block w-full mx-2 px-4 py-2 border rounded-lg text-center"
            />
            <button
              type="button"
              onClick={() =>
                setWeightGoal((prev) => (parseFloat(prev) + 0.1).toFixed(2))
              }
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              +
            </button>
          </div>
        </>
      )}
      <button
        onClick={onPrev}
        className="block w-full px-4 py-2 rounded-lg bg-gray-500 text-white mb-2"
      >
        Previous
      </button>
      <button
        onClick={onSubmit}
        className="block w-full px-4 py-2 rounded-lg bg-indigo-500 text-white"
      >
        Submit
      </button>
    </Box>
  );
};

export default StepThree;
