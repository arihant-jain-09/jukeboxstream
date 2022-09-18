import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { AmplifyProvider } from '@aws-amplify/ui-react';

Amplify.configure(config);

ReactDOM.render(
  <AmplifyProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AmplifyProvider>,
  document.getElementById('root')
);
