import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import {Provider} from 'react-redux';
import appStore from './utils/appStore'
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
       <ToastContainer position="top-right" autoClose={3000} />
     <App />
    </Provider>
  </StrictMode>,
)
