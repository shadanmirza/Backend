import {BrowserRouter, Navigate, Route, Routes} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'

 function AppRoutes() {
  return (   
    <BrowserRouter>
    <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
    </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
