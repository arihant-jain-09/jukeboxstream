'use client';

import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

function Providers({ children }) {
  return (
    <Provider store={store}>
      <Authenticator.Provider>{children}</Authenticator.Provider>
    </Provider>
  );
}

export default Providers;
