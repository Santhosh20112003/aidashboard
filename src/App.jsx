import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/Dashboard";
import NIM from './NIM';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='' element={<Navigate to="dashboard" />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='nvidia' element={<NIM />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App