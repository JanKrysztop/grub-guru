import jwt from "jsonwebtoken";
import nookies from "nookies";

const withAuth = (gssp) => async (ctx) => {
  const cookies = nookies.get(ctx);
  const token = cookies.token;

  let tokenExpired = false; // Flag to indicate token expiry

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: { tokenExpired: true },
    };
  }

  try {
    jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    tokenExpired = true; // Set the flag if token verification fails
    // Clear the token cookie
    nookies.set(ctx, "token", "", {
      maxAge: -1,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  }

  // If token has expired, redirect to login and pass the tokenExpired flag
  if (tokenExpired) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: { tokenExpired },
    };
  }

  // If token is valid, continue with the original getServerSideProps function
  return await gssp(ctx);
};

export default withAuth;

// import jwt from "jsonwebtoken";
// import nookies from "nookies";

// const withAuth = (gssp) => async (ctx) => {
//   const cookies = nookies.get(ctx);
//   const token = cookies.token;

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   try {
//     jwt.verify(token, process.env.SECRET_KEY);
//   } catch (error) {
//     // Clear the token cookie if verification fails
//     nookies.set(ctx, "token", "", {
//       maxAge: -1,
//       path: "/",
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//     });

//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//       props: { tokenInvalid: true },
//     };
//   }

//   return await gssp(ctx); // Continue with the original getServerSideProps function
// };

// export default withAuth;
