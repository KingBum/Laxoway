import './App.css'
import { Booking, TripList, Home, Payment, Login, Register, Success } from "./pages"
import { useState } from "react"
import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const user = true

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/booking' element={<Booking />} />

          <Route path='/payment/:id' element={<Payment />} />

          <Route path='/success' element={<Success />} />

          <Route path='/login' element={user ? <Home /> : <Login />} />

          <Route path='/register' element={user ? <Home /> : <Register />} />

          <Route path='/trip' element={<TripList />} />


        </Routes>
      </Router>
    </>
  )
}

export default App
