import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginProvider from './components/auth/setting';


const Main = () => <App />;


const rootElement = document.getElementById('root');
ReactDOM.render(
  <LoginProvider>
    <Main />
  </LoginProvider>,
  rootElement,
);