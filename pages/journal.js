import Journal from "@/components/features/Journal";
import withAuth from "@/utils/withAuth";

//Temporarily disabled because of timeout on vercell
// export const getServerSideProps = withAuth(async (ctx) => {
//   return { props: {} };
// });

const JournalPage = () => {
  return <Journal />;
};

export default JournalPage;
