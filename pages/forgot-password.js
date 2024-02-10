import { useState } from "react";
import axios from "axios";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import InfoIcon from "@mui/icons-material/Info";
import { CheckCircle } from "@mui/icons-material";
import Snackbar from "@mui/joy/Snackbar";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const timezoneOffset = new Date().getTimezoneOffset();
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/users/forgot-password`,
        { email, timezoneOffset }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        router.push("/");
      }, 4000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while trying to send reset instructions");
      }
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
        justifyContent: "center",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: "sm",
          p: 3,
          m: 2,
        }}
      >
        <CustomInput
          id="email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type in your email"
          className="mb-7"
        />
        <CustomButton type="submit" loading={loading}>
          Send Reset Instructions
        </CustomButton>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={4000}
          open={error}
          variant="solid"
          color="danger"
          size="lg"
          onClose={() => {
            setError(null);
          }}
        >
          <InfoIcon />
          {error}
        </Snackbar>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          autoHideDuration={4000}
          open={message}
          variant="solid"
          color="success"
          size="lg"
          onClose={() => {
            setMessage(null);
          }}
        >
          <CheckCircle />
          {message}
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
