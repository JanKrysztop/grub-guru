import { useEffect, useRef } from "react";
import CustomButton from "./CustomButton";
import { Box, IconButton, Card, Typography } from "@mui/joy";
import CloseRounded from "@mui/icons-material/CloseRounded";

const DeleteMenu = ({ show, setShow, handleDelete, mode, icon }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    // Attach event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [setShow]);
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <IconButton
          size="lg"
          variant="plain"
          color="neutral"
          onClick={() => setShow(true)}
          sx={{
            borderRadius: "50%",
            "&:hover": {
              backgroundColor: mode === "dark" && "#6A6D69",
            },
          }}
        >
          {icon ? icon : <CloseRounded />}
        </IconButton>
        {show && (
          <Card
            ref={menuRef}
            sx={{
              width: "300px",
              position: "absolute",
              right: "75%",
              top: "85%", // Adjust this value as needed for spacing
              zIndex: 10000,
              bgcolor: mode === "dark" && "#494b47",
            }}
          >
            <Typography>
              Are you sure you want to delete this product?
            </Typography>
            <CustomButton onClick={handleDelete}>Delete</CustomButton>
            <CustomButton onClick={() => setShow(false)} styleType="secondary">
              Cancel
            </CustomButton>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default DeleteMenu;
