import Input from "@mui/joy/Input";
import { forwardRef } from "react";
const customInputStyles = {
  height: "40px",
  borderRadius: "16px",
  "&.MuiInput-root.Mui-focused, &.MuiInput-root.Mui-focused::before": {
    boxShadow: `inset 0 0 0 2px #549801`,
  },
};

const CustomInput = forwardRef(
  ({ placeholder, value, onChange, type, style, ...props }, ref) => {
    return (
      <Input
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
