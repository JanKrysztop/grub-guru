import "@/styles/globals.css";
import "@fontsource/inter";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Layout from "@/components/layout/AppLayout";
import { CssVarsProvider } from "@mui/joy/styles";

const App = ({ Component, pageProps }) => {
  return (
    <CssVarsProvider defaultMode="system">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </CssVarsProvider>
  );
};

export default App;
