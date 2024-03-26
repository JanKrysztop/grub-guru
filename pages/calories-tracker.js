import CaloriesTracker from "@/components/features/caloriesTracker/CaloriesTracker";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = async (ctx) => {
  // Add minimal logic here to test the response time
  return { props: {} };
};

const CaloriesTrackerPage = () => {
  return <CaloriesTracker />;
};

export default CaloriesTrackerPage;
