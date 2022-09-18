import React from 'react';
import Header from './components/Header/Header';
import './App.scss';
import { withAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  return (
    <div className="app">
      <Header />
    </div>
  );
};

export default withAuthenticator(App);
