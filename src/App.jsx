import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Products from './pages/Products/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/products' element={<Products/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
