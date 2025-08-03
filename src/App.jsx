import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Navbar from './components/Navbar'
import Signup from '../src/pages/Signup'
import BlogForm from './components/BlogForm'
import Login from '../src/pages/Login'
import About from './About'
import Contact from './Contact'
import AuthGuard from './routes/AuthGuard'
import IsLogin from './routes/isLogin'
import BlogDetails from './pages/BlogDetails'
import YourBlogs from './pages/YourBlogs'
import UserProfile from './pages/UserProfile'
import Footer from './components/footer'
import Modal from './components/Modal'



function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthGuard />}>
            <Route path='/' element={<><Navbar /><Home /><Footer/></>} />
            <Route path='/about' element={<><Navbar /><About /><Footer/></>} />
            <Route path='/contact' element={<><Navbar /><Contact /><Footer/></>} />
            <Route path='/blogform' element={<><Navbar /><BlogForm /><Footer/></>} />
            <Route path='/blog/:id' element={<><Navbar/><BlogDetails/><Footer/></>} />
            <Route path='/yourblogs/' element={<><Navbar/><YourBlogs/><Modal/><Footer/></>} />
            <Route path='/userprofile/' element={<><Navbar/><UserProfile/><Footer/></>} />

          </Route>
          <Route element={< IsLogin />}>
            <Route path='/signup' element={<><Signup /></>} />
            <Route path='/login' element={<><Login /></>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
