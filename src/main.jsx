import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router";
import { TooltipProvider } from "@/components/ui/tooltip"
import App from './App.jsx'
import { ToastContainer, Zoom } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <TooltipProvider>

<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Zoom}
/>

    <App />
    </TooltipProvider>
    </BrowserRouter>

  </StrictMode>
)
