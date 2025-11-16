import { useState } from 'react'
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Home';
import {AllReservations, OverAverage} from './CommonViews';
import ViewCustomers from './Customer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-reservations" element={<AllReservations />} />
        <Route path="/over-average" element={<OverAverage />} />
        <Route path="/customers" element={<ViewCustomers />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
