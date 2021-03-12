import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TmDb from './TmDb'
import APIKEY from './api_key'


ReactDOM.render(
  <React.StrictMode>
    <App />
    <APIKEY></APIKEY>
  </React.StrictMode>,
  document.getElementById('root')
);
