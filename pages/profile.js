import Profile from "@/components/features/Profile";
import withAuth from "@/utils/withAuth";

//Temporarily disabled because of timeout on vercell
// export const getServerSideProps = withAuth(async (ctx) => {
//   return { props: {} };
// });
const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
