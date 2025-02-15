import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import  store  from './reducer/index.js'; 
import { Provider } from "react-redux";
// import { configureStore } from "@reduxjs/toolkit";
// import rootReducer from "./reducer";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'; 


const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ToastContainer />
          <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
