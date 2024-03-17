import Input from "@mui/joy/Input";
import { forwardRef } from "react";

import { useSelector } from "react-redux";
import { selectComponentBackground } from "@/redux/themeSlice";

const CustomInput = forwardRef(
  ({ placeholder, value, onChange, type, style, ...props }, ref) => {
    const backgroundColor = useSelector(selectComponentBackground);
    const customInputStyles = {
      height: "48px",
      borderRadius: "16px",
      width: "100%",
      "&.MuiInput-root.Mui-focused, &.MuiInput-root.Mui-focused::before": {
        boxShadow: `inset 0 0 0 2px #549801`,
      },
      backgroundColor: backgroundColor,
      '& input[type="number"]::-webkit-inner-spin-button, & input[type="number"]::-webkit-outer-spin-button':
        {
          WebkitAppearance: "none",
          margin: 0,
        },
      '& input[type="number"]': {
        MozAppearance: "textfield",
      },
    };

    return (
      <Input
        autoComplete="off"
        type={type}
        sx={{ ...customInputStyles, ...style }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        ref={ref}
        {...props} // Pass any additional props to the underlying Input component
      />
    );
  }
);
CustomInput.displayName = "CustomInput";
export default CustomInput;
