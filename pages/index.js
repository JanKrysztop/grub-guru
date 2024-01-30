// import Link from "next/link";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
// import { clearUserData } from "@/redux/userSlice"; // Assuming this is your action to clear user data
// import withAuth from "@/utils/withAuth";
// //TODO: delete this page
// const WelcomePage = ({ tokenExpired }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (tokenExpired) {
//       dispatch(clearUserData()); // Clear Redux state
//       localStorage.clear(); // Clear local storage
//       // No need to redirect to "/login" since we are already on the welcome page
//     } else {
//       router.push("/dashboard"); // Redirect to dashboard if token is not expired
//     }
//   }, [tokenExpired, dispatch, router]);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <header className="text-center">
//         <h1 className="text-6xl font-bold text-gray-900 mb-4">
//           Welcome to Grub Guru
//         </h1>
//         <p className="text-xl text-gray-700">
//           Your journey to delicious meals starts here.
//         </p>
//         <div className="mt-8">
//           <Link
//             href="/login"
//             className="mr-3 border-2 border-indigo-500 inline-block px-5 py-3 rounded-lg shadow-lg bg-white text-indigo-500 text-lg font-semibold tracking-wide transform hover:scale-110 hover:bg-indigo-200 hover:border-indigo-700"
//           >
//             Log In
//           </Link>
//           <Link
//             href="/authorization"
//             className="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-white text-lg font-semibold tracking-wide transform hover:scale-110 hover:bg-indigo-700"
//           >
//             Sign up
//           </Link>
//         </div>
//       </header>
//     </div>
//   );
// };

// export const getServerSideProps = withAuth(async (ctx, token) => {
//   // If the token is valid, the user will be redirected to the dashboard.
//   // If the token is invalid or not present, the user will see the welcome page.
//   // The tokenExpired flag will be set accordingly by withAuth.
//   return { props: {} };
// });

// export default WelcomePage;

// // import Link from "next/link";

// // const WelcomePage = () => {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <header className="text-center">
// //         <h1 className="text-6xl font-bold text-gray-900 mb-4">
// //           Welcome to Grub Guru
// //         </h1>
// //         <p className="text-xl text-gray-700">
// //           Your journey to delicious meals starts here.
// //         </p>
// //         <div className="mt-8">
// //           <Link
// //             href="/login"
// //             className="mr-3 border-2 border-indigo-500 inline-block px-5 py-3 rounded-lg shadow-lg bg-white text-indigo-500 text-lg font-semibold tracking-wide transform hover:scale-110 hover:bg-indigo-200 hover:border-indigo-700"
// //           >
// //             Log In
// //           </Link>
// //           <Link
// //             href="/authorization"
// //             className="inline-block px-5 py-3 rounded-lg shadow-lg bg-indigo-500 text-white text-lg font-semibold tracking-wide transform hover:scale-110 hover:bg-indigo-700"
// //           >
// //             Sign up
// //           </Link>
// //         </div>
// //       </header>
// //     </div>
// //   );
// // };

// // export default WelcomePage;
