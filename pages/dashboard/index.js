import Dashboard from "@/components/views/Dashboard";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const DashboardPage = () => {
  return <Dashboard />;
};

export default DashboardPage;
