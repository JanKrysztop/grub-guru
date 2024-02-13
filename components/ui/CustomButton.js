import Button from "@mui/joy/Button";
import { forwardRef } from "react";

const primaryButtonStyles = {
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
const secondaryButtonStyles = {
  width: "100%",
  height: "40px",
  border: "2px solid #549801",
  borderRadius: "16px",
  backgroundColor: "#FAFAFA",
  color: "#8E928C",
  boxShadow: "none",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "600",
  "&:hover": {
    backgroundColor: "#FAFAFA",
    color: "#0F6F3C",
  },
  "&.MuiButton-root:active": {
    backgroundColor: "#E1FEEA",
    color: "#0F6F3C",
  },
  // "&.MuiButton-root.Mui-focused": {
  //   boxShadow: `inset 0 0 0 2px #549801`,
  // },
};

const CustomButton = forwardRef(
  (
    {
      children,
      onClick,
      style,
      styleType = "primary",
      variant = "solid",
      sx,
      ...props
    },
    ref
  ) => {
    const buttonStyles =
      styleType === "primary" ? primaryButtonStyles : secondaryButtonStyles;

    return (
      <Button
        variant={variant}
        sx={{ ...buttonStyles, ...sx, ...style }}
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
