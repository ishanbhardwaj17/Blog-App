import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

const routes = createBrowserRouter([
  {
    path: '/',
    element: <div>Home</div>
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

export default routes