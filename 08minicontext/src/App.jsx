import React from 'react'
import Login from './component/Login'
import Profile from './component/Profile'

import './App.css'
import UserContextProvider from './context/UserContextProvider'

function App() {

  return (
    <UserContextProvider>
      <h1>React Video for Context API</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
