import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <ToastContainer
position="top-center"
autoClose={2500}
hideProgressBar
newestOnTop
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="light"
transition={Bounce}/>  
</React.StrictMode>,
)

