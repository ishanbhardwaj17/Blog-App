import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import routes from './routes.jsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './features/auth/Auth.context.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
  </StrictMode>,
)
