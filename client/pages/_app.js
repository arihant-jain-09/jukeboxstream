import '../styles/globals.css';
// import { SessionProvider } from "next-auth/react";
import { wrapper } from '../redux/store';
import { Provider } from 'react-redux';
// import Auth from "../components/Auth/Auth";

import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';

Amplify.configure({ ...awsconfig, ssr: true });

function App({ Component, pageProps }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      {/* <SessionProvider session={pageProps.session}> */}
      {/* <Auth> */}
      <Authenticator.Provider>
        <Component {...props.pageProps} />
      </Authenticator.Provider>

      {/* </Auth> */}
      {/* </SessionProvider> */}
    </Provider>
  );
}
export default App;
