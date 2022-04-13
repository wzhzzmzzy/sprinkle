import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/views/home'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
    </Routes>
  )
}

export default App
