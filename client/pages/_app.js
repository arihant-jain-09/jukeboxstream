import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";
import Auth from "../components/Auth/Auth";

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Auth>
          <Component {...props.pageProps} />
        </Auth>
      </SessionProvider>
    </Provider>
  );
}
export default App;
