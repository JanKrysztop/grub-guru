import { Box, IconButton, Card, Typography } from "@mui/joy";
import CustomButton from "./CustomButton";
import { DeleteRounded } from "@mui/icons-material";

const DeleteModal = ({ show, setShow, handleDelete, mode, id }) => {
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
          <DeleteRounded />
        </IconButton>
        {show && (
          <Card
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
            <CustomButton onClick={handleDelete(id)}>Delete</CustomButton>
            <CustomButton onClick={() => setShow(false)} styleType="secondary">
              Cancel
            </CustomButton>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default DeleteModal;
