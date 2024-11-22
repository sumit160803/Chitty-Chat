import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore.js'
const App = () => {
  const{ authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }
  , [checkAuth]);

  if(isCheckingAuth && !authUser) {  //loading animation
    return( <span className="loading loading-infinity loading-lg"></span>);
  }
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={'/login'} />} /> {/* if user is not logged in, redirect to login page */}
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={'/'} />} /> {/* if user is logged in, redirect to home page */}
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={'/'} />} /> {/* if user is logged in, redirect to home page */}
        <Route path='/settings' element={<SettingsPage/>} /> {/* available to everyone */}
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to={'/login'} />} /> {/* if user is not logged in, redirect to login page */}
      </Routes>

      <Toaster />
    </div> 
  )
}

export default App