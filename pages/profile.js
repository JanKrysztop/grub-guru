import Profile from "@/components/features/Profile";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
