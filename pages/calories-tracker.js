import CaloriesTracker from "@/components/features/caloriesTracker/CaloriesTracker";
import withAuth from "@/utils/withAuth";
//Temporarily disabled because of timeout on vercell
// export const getServerSideProps = withAuth(async (ctx) => {
//   return { props: {} };
// });

const CaloriesTrackerPage = () => {
  return <CaloriesTracker />;
};

export default CaloriesTrackerPage;
