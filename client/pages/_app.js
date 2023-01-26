import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { wrapper } from "../redux/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...props.pageProps} />
      </SessionProvider>
    </Provider>
  );
}
export default App;
