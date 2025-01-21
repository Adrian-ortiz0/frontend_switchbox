import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import { Login } from './Components/Login.jsx'
import { SignIn } from './Components/SignIn.jsx'
import { StorageMenu } from './Components/StorageMenu.jsx'
import { Profile } from './Components/Profile.jsx'

export const SwitchBox = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/storage-menu' element={<StorageMenu />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </Router>
  )
}
