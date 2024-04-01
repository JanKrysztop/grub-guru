import { forwardRef } from "react";
import { useColorScheme } from "@mui/joy/styles";
import Button from "@mui/joy/Button";

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
    const { mode, setMode } = useColorScheme();
    const primaryButtonStyles = {
      width: "100%",
      height: "48px",
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
      height: "48px",
      border: "2px solid #549801",
      borderRadius: "16px",
      backgroundColor: mode === "dark" ? "#292B29" : "#FAFAFA",
      color: mode === "dark" ? "#FAFAFA" : "#064926",
      boxShadow: "none",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: "600",
      "&:hover": {
        backgroundColor: mode === "dark" ? "#022611" : "#FAFAFA",
        color: mode === "dark" ? "#87EE02" : "#0F6F3C",
      },
      "&.MuiButton-root:active": {
        backgroundColor: mode === "dark" ? "#064926" : "#E1FEEA",
        color: mode === "dark" ? "#87EE02" : "#0D5E33",
      },
    };
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
