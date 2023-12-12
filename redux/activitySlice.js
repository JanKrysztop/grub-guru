import { createSlice } from "@reduxjs/toolkit";

export const activitySlice = createSlice({
  name: "activity",
  initialState: {
    levels: [
      { id: 1, label: "Sedentary (little or no exercise)", value: 1.2 },
      {
        id: 2,
        label: "Lightly active (light exercise/sports 1-3 days/week)",
        value: 1.375,
      },
      {
        id: 3,
        label: "Moderately active (moderate exercise/sports 3-5 days/week)",
        value: 1.55,
      },
      {
        id: 4,
        label: "Very active (hard exercise/sports 6-7 days a week)",
        value: 1.725,
      },
      {
        id: 5,
        label: "Extra active (very hard exercise/physical job & exercise)",
        value: 1.9,
      },
    ],
  },
  reducers: {},
});

export const selectActivityLevels = (state) => state.activity.levels;

export default activitySlice.reducer;
