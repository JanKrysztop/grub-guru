import Journal from "@/components/features/Journal";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const JournalPage = () => {
  return <Journal />;
};

export default JournalPage;
