import { createSlice } from "@reduxjs/toolkit";

export const bmrSlice = createSlice({
  name: "bmr",
  initialState: {
    formulas: {
      Harris: {
        male: (weight, height, age) =>
          13.397 * weight + 4.799 * height - 5.677 * age + 88.362,
        female: (weight, height, age) =>
          9.247 * weight + 3.098 * height - 4.33 * age + 447.593,
      },
      Mifflin: {
        male: (weight, height, age) =>
          10 * weight + 6.25 * height - 5 * age + 5,
        female: (weight, height, age) =>
          10 * weight + 6.25 * height - 5 * age - 161,
      },
    },
  },
  reducers: {},
});

export const selectBmrFormulas = (state) => state.bmr.formulas;

export default bmrSlice.reducer;
