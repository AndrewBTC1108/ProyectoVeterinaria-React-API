import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AmorPorTiProvider } from './Context/AmorPorTiProvider'
import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AmorPorTiProvider>
      <RouterProvider router={router} />
    </AmorPorTiProvider>
  </React.StrictMode>,
)
