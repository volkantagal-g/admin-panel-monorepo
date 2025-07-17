import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StandaloneApp from './StandaloneApp';

const container = document.getElementById('root');

if (window.location.port === "8081") {
  ReactDOM.render(<StandaloneApp />, container);
} else {
  ReactDOM.render(<App />, container);
} 