import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUserData } from "@/redux/userSlice";
import { format, startOfMonth, endOfMonth, getMonth, getYear } from "date-fns";
import WebcamComponent from "./Camera";
import Calendar from "./Calendar";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import { useColorScheme } from "@mui/joy/styles";
import {
  Box,
  Button,
  Snackbar,
  AspectRatio,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
  ModalClose,
  Badge,
} from "@mui/joy";
import {
  AddAPhotoRounded,
  InfoRounded,
  CheckCircleRounded,
} from "@mui/icons-material";

const Journal = () => {
  const userData = useSelector(selectUserData);

  const [weight, setWeight] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const prevDateRef = useRef();
  const { mode, setMode } = useColorScheme();

  const handleOpenPhotoModal = (index) => {
    setSelectedPhotoIndex(index);
    setShowPhotoModal(true);
  };
  const handleDeletePhoto = (index) => {
    setPhotos(photos.filter((_, photoIndex) => photoIndex !== index));
  };
  const handleModalDelete = (index) => {
    handleDeletePhoto(index);
    setShowPhotoModal(false);
  };
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  const fetchUserEntry = async () => {
    if (!userData?._id) return;
    setWeight("");
    setPhotos([]);

    try {
      // Using date-fns to format the date
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/journal/entry?userId=${userData._id}&date=${formattedDate}`
      );
      console.log(response.data);
      setWeight(response.data.weight);
      setPhotos(response.data.photos);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMonthEntries = async () => {
    if (!userData?._id) return;

    try {
      // Assuming 'date' is the date object for the current month you're interested in
      // Calculate the start and end of the month for 'date'
      const startDate = startOfMonth(date);
      const endDate = endOfMonth(date);

      // Format startDate and endDate to YYYY-MM-DD format for the API call
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(endDate, "yyyy-MM-dd");

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/journal/entries-range?userId=${userData._id}&startDate=${formattedStartDate}&endDate=${formattedEndDate}`
      );
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      !prevDateRef.current ||
      getMonth(prevDateRef.current) !== getMonth(date) ||
      getYear(prevDateRef.current) !== getYear(date)
    ) {
      fetchMonthEntries();
    }
    prevDateRef.current = date;
  }, [date, userData?._id]);

  useEffect(() => {
    fetchUserEntry();
  }, [date, userData?._id]);

  const handleCreateEntry = async () => {
    setLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const payload = {
        userId: userData._id,
        date: formattedDate,
        weight: weight,
        photos: photos,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/journal/create`,
        payload
      );
      console.log("Entry created:", response.data);
      setEntries((currentEntries) => [...currentEntries, response.data]);
      setSnackbar({
        open: true,
        type: "success",
        message: "Entry successfully created!",
      });
    } catch (error) {
      console.log(error);
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to create entry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Calendar
        handleDateChange={handleDateChange}
        date={date}
        entries={entries}
      />
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "sm",
          p: 3,
          m: 2,
        }}
      >
        <CustomInput
          type="number"
          value={weight}
          onChange={handleWeightChange}
          placeholder="Enter your weight"
        />
        <Badge
          badgeContent={photos.length}
          variant="solid"
          sx={{
            margin: 2,
            "& .MuiBadge-badge": {
              backgroundColor: "#549801 !important",
            },
          }}
        >
          <Button
            onClick={() => setShowCamera(true)}
            variant="soft"
            color="neutral"
            sx={{
              // m: 2,
              display: "flex",
              flexDirection: "column",
              width: "120px",
              height: "120px",
              backgroundColor: mode === "dark" && "#494B47",
            }}
          >
            <AddAPhotoRounded sx={{ width: "60px", height: "60px" }} />
            Add photo
          </Button>
        </Badge>
        <Modal
          open={showCamera}
          onClose={() => setShowCamera(false)}
          size="lg"
          variant="soft"
        >
          <ModalDialog
            size="lg"
            sx={{
              width: "100%",
              maxWidth: "600px",
              height: "70vh",
              maxHeight: "800px",
            }}
          >
            <ModalClose variant="plain" sx={{ m: 1 }} />
            <DialogTitle>Add photos</DialogTitle>
            <DialogContent>
              <WebcamComponent
                handleDeletePhoto={handleDeletePhoto}
                photos={photos}
                setPhotos={setPhotos}
              />
            </DialogContent>
          </ModalDialog>
        </Modal>

        <Box sx={{ display: "flex", gap: "10px", p: 1, m: 1 }}>
          {photos.map((photo, index) => (
            <Button
              onClick={() => handleOpenPhotoModal(index)}
              key={index}
              sx={{
                p: 0,
                m: 0,
                width: "76px", // Fixed width for thumbnails
                height: "76px", // Fixed height for thumbnails
                marginTop: "10px",
                borderRadius: "8px", // Added for consistency with AspectRatio
                overflow: "hidden", // Ensures the image is clipped to the border radius
              }}
            >
              <img
                src={photo}
                alt={`Captured ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Button>
          ))}
          <Modal
            size="lg"
            variant="soft"
            open={showPhotoModal}
            onClose={() => setShowPhotoModal(false)}
          >
            <ModalDialog
              size="lg"
              sx={{
                width: "100%",
                maxWidth: "600px",
                height: "70vh",
                maxHeight: "800px",
              }}
            >
              <ModalClose variant="plain" sx={{ m: 1 }} />
              <DialogTitle>Photo {selectedPhotoIndex + 1}</DialogTitle>
              <DialogContent
                sx={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "space-around",
                }}
              >
                <AspectRatio objectFit="contain">
                  <img
                    src={photos[selectedPhotoIndex]}
                    alt="Selected"
                    // style={{ width: "100%", objectFit: "contain" }}
                  />
                </AspectRatio>
                <CustomButton
                  onClick={() => handleModalDelete(selectedPhotoIndex)}
                >
                  Delete photo
                </CustomButton>
              </DialogContent>
            </ModalDialog>
          </Modal>
        </Box>

        <CustomButton onClick={handleCreateEntry} loading={loading}>
          {" "}
          Save entry
        </CustomButton>
      </Box>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={4000}
        open={snackbar.open}
        variant="solid"
        color={
          snackbar.open && snackbar.type === "success"
            ? "success"
            : snackbar.open
            ? "danger"
            : undefined
        }
        size="lg"
        onClose={() => {
          setSnackbar((prevState) => ({ ...prevState, open: false }));
        }}
      >
        {snackbar.type === "success" ? <CheckCircleRounded /> : <InfoRounded />}
        {snackbar.message}
      </Snackbar>
    </Box>
  );
};

export default Journal;
