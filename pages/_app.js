import "@/styles/globals.css";
import "@fontsource/inter";
import { CssVarsProvider } from "@mui/joy/styles";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";
import Layout from "@/components/layout/layout";

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
