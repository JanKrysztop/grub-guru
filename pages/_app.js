import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import UserProvider from "@/contexts/userProvider";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
