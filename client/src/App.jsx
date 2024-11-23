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
import { useThemeStore } from './store/useThemeStore.js'
import { Loader } from 'lucide-react'
const App = () => {
  const{ authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    checkAuth();
  }
  , [checkAuth]);

  //loading animation
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  return (
    <div data-theme={theme}>
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