import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

// maybeTODO: automatic login if the account has been verified
const Confirm = () => {
  const router = useRouter();
  const { token } = router.query;

  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {loading ? (
        <p className="text-lg font-semibold text-gray-700">
          Confirming account...
        </p>
      ) : confirmed ? (
        <>
          <p className="mb-4 text-lg font-semibold text-green-600">
            Account confirmed successfully!
          </p>
          <Link
            href="/login"
            className="px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            Log in to your account
          </Link>
        </>
      ) : (
        <p className="text-lg font-semibold text-red-600">
          Error confirming account. Please try again.
        </p>
      )}
    </div>
  );
};

export default Confirm;
