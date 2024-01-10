import jwt from "jsonwebtoken";
import nookies from "nookies";

const withAuth = (gssp) => async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    // Clear the token cookie if verification fails
    nookies.set(ctx, "token", "", {
      maxAge: -1,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return await gssp(ctx); // Continue with the original getServerSideProps function
};

export default withAuth;
