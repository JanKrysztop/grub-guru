import CaloriesTracker from "@/components/features/caloriesTracker/CaloriesTracker";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (ctx) => {
  // Your page's server-side logic here
  return { props: {} };
});
//TODO: Logout user if token is expired,
const CaloriesTrackerPage = () => {
  return <CaloriesTracker />;
};

export default CaloriesTrackerPage;
