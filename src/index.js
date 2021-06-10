import React from 'react';
import ReactDOM from 'react-dom';
import localforage from 'localforage';

import { log } from './utils'; // eslint-disable-line

import './scss/index.scss';
import App from './App';
import { GAME_STATE } from './constants';

// For local sessions
localforage.config({
  name: 'C4_ConnectFour',
  storeName: 'C4_Store'
});

localforage.getItem(GAME_STATE.start).then(v => {
  if(!v) localforage.setItem(GAME_STATE.start, false);
});



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
