//TODO: delte this if not used later!
import CustomProductForm from "@/components/forms/CustomProductForm";
import withAuth from "@/utils/withAuth";

export const getServerSideProps = withAuth(async (ctx) => {
  // Your page's server-side logic here
  return { props: {} };
});
const CustomProductPage = () => {
  return <CustomProductForm />;
};

export default CustomProductPage;
