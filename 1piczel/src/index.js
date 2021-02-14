import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; 
ReactDOM.render(
  <React.StrictMode>
   <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
