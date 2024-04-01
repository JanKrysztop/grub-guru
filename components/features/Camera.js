import { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Box, Button, Typography } from "@mui/joy";
import { CameraswitchRounded, CloseRounded } from "@mui/icons-material";

const WebcamComponent = ({ photos, setPhotos, handleDeletePhoto }) => {
  const webcamRef = useRef(null);
  const [facingMode, setFacingMode] = useState("user");
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const handleUserMedia = () => {
    setTimeout(() => {
      setIsWebcamReady(true);
    }, 500);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhotos((prevPhotos) => [...prevPhotos, imageSrc]);
  }, [webcamRef, setPhotos]);

  // const deletePhoto = (index) => {
  //   setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  // };

  const toggleCamera = () => {
    setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode }}
          onUserMedia={handleUserMedia}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box width="100%">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button sx={{ visibility: "hidden" }} size="lg">
            <CameraswitchRounded sx={{ width: "35px", height: "35px" }} />
          </Button>
          <Button
            onClick={capture}
            disabled={!isWebcamReady || photos.length >= 4}
            color="neutral"
            sx={{
              padding: "4px",
              width: "70px",
              height: "70px",
              borderRadius: "50%",
            }}
          >
            <Box
              sx={{
                p: 0,
                m: 0,
                border: "4px solid",
                borderColor: "background.surface",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
              }}
            ></Box>
          </Button>
          <Button
            onClick={toggleCamera}
            color="neutral"
            variant="plain"
            size="lg"
          >
            <CameraswitchRounded sx={{ width: "35px", height: "35px" }} />
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2, // Spacing between items
            justifyContent: "center",
          }}
        >
          {photos.length > 0 ? (
            photos.map((photo, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "76px", // Fixed width for thumbnails
                  height: "76px", // Fixed height for thumbnails
                  display: "inline-block",
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
                <Button
                  onClick={() => handleDeletePhoto(index)}
                  variant="text"
                  color="neutral"
                  sx={{
                    width: "35px",
                    height: "35px",

                    position: "absolute",
                    top: "0px",
                    right: "0px",
                    minWidth: "auto",
                    padding: "0",
                    borderRadius: "50%", // Makes the button circular
                  }}
                >
                  <CloseRounded sx={{ color: "white" }} />
                </Button>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "86px",
                p: 2,
              }}
            >
              <Typography color="neutral" level="h4">
                No photos added
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WebcamComponent;
