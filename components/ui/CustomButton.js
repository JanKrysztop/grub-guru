import Button from "@mui/joy/Button";
import { forwardRef } from "react";

const customButtonStyles = {
  width: "100%",
  height: "40px",
  borderRadius: "16px",
  backgroundColor: "#549801",
  color: "#022611",
  boxShadow: "none",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#549801",
    color: "#87EE02",
  },
  "&.MuiButton-root:active": {
    backgroundColor: "#0D5E33",
    color: "#87EE02",
  },
  "&.MuiButton-root.Mui-focused": {
    boxShadow: `inset 0 0 0 2px #549801`,
  },
};

const CustomButton = forwardRef(
  ({ children, onClick, style, variant = "solid", ...props }, ref) => {
    return (
      <Button
        variant={variant}
        sx={{ ...customButtonStyles, ...style }}
        onClick={onClick}
        ref={ref}
        {...props} // Pass any additional props to the underlying Button component
      >
        {children}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
