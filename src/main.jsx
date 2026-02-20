import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes/AppRoutes' // Make sure this path is correct!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)