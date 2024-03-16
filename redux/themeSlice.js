import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme", // Add a name for your slice
  initialState: {
    mainBackground: "",
    componentBackground: "",
  },
  reducers: {
    setMainBackground: (state, action) => {
      state.mainBackground = action.payload;
    },
    setComponentBackground: (state, action) => {
      state.componentBackground = action.payload;
    },
  },
});

// Export actions
export const { setMainBackground, setComponentBackground } = themeSlice.actions;
export const selectMainBackground = (state) => state.theme.mainBackground;

export const selectComponentBackground = (state) =>
  state.theme.componentBackground;

export default themeSlice.reducer;
