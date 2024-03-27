import Calculator from "@/components/views/Calculator";
import withAuth from "@/utils/withAuth";

//Temporarly disabled because of timeout on vercell
// export const getServerSideProps = withAuth(async (ctx) => {
//   return { props: {} };
// });

const CalculatorPage = () => {
  return <Calculator />;
};

export default CalculatorPage;
