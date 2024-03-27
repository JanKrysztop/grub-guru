import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/joy";
import CustomButton from "@/components/ui/CustomButton";
import useThemeSettings from "@/hooks/useThemeSettings";

// maybeTODO: automatic login if the account has been verified
const Confirm = () => {
  const router = useRouter();
  const { token } = router.query;
  const { backgroundColor } = useThemeSettings();

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(true);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MAIN_URL}/users/confirm/${token}`
        );
        console.log(response.data);
        setConfirmed(true);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      confirmAccount();
    }
  }, [token]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        //
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "top",
          textAlign: "center",
          flexGrow: 1,
          width: "100%",
          maxWidth: "sm",
          p: 3,
          m: 2,
        }}
      >
        {loading ? (
          <Typography level="h3"> Confirming account...</Typography>
        ) : confirmed ? (
          <>
            <Box
              sx={{
                width: "120px",
                height: "120px",
                bgcolor: backgroundColor,
                borderRadius: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 8,
                border: "2px solid #549801",
              }}
            >
              <img
                src="/carrot.svg"
                alt="Carrot Logo"
                style={{ width: "100px", height: "100px" }}
              />
            </Box>
            <Typography mb={4} level="h3">
              Account confirmed successfully!
            </Typography>
            <CustomButton onClick={() => router.push("/")}>
              Log in to your account
            </CustomButton>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: "120px",
                height: "120px",
                bgcolor: backgroundColor,
                borderRadius: "60px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 8,
                border: "2px solid #c41c1c",
              }}
            >
              <img
                src="/carrot.svg"
                alt="Carrot Logo"
                style={{ width: "100px", height: "100px" }}
              />
            </Box>
            <Typography level="h3" sx={{ color: "#c41c1c" }}>
              Error confirming account. Please try again.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Confirm;
