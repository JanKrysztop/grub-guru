import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setMainBackground,
  setComponentBackground,
  selectMainBackground,
} from "@/redux/themeSlice";
import { useColorScheme } from "@mui/joy/styles";

const useThemeSettings = () => {
  const { mode, setMode } = useColorScheme();
  const dispatch = useDispatch();
  const backgroundImage =
    mode === "dark" ? "/dark-background.svg" : "/light-background.svg";
  const backgroundColor = useSelector(selectMainBackground);

  useEffect(() => {
    const backgrounds = {
      dark: { main: "#292B29", component: "#494B47" },
      light: { main: "#FAFAFA", component: "#FAFAFA" },
    };
    const { main, component } = backgrounds[mode] || backgrounds.light;
    dispatch(setMainBackground(main));
    dispatch(setComponentBackground(component));
  }, [mode, dispatch]);

  return { backgroundImage, backgroundColor, mode, setMode };
};
export default useThemeSettings;
