import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import React from 'react'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
