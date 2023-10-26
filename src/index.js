import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './projet-node/App'
import { CustomeContextProvider } from './Components/Context/CustomeContext.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomToast from './Components/Toast/CustomToast';
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomeContextProvider>
          <CustomToast />
          <Routes>
            <Route index element = { <Login />} />
            <Route path = "/*" element = { <App />} />
          </Routes>
      </CustomeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
