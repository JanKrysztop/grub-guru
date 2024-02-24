import Calculator from "@/components/views/Calculator";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (ctx) => {
  return { props: {} };
});

const CalculatorPage = () => {
  return <Calculator />;
};

export default CalculatorPage;
