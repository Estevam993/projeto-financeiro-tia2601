import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.tsx'
import {Login} from "./pages";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route index element={<App />} />
          </Routes>
          <Routes>
              <Route path={"/login"} element={<Login />} />
          </Routes>
      </BrowserRouter>

  </StrictMode>,
)
