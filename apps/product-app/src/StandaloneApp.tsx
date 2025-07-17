import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const StandaloneApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default StandaloneApp; 