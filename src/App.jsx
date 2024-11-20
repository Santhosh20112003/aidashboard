import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from "./components/dashboard/Dashboard";
import NIM from './NIM';
import { UserAuthContextProvider } from "./components/context/UserAuthContext";
import Home from './components/main/Home';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Access from "./components/auth/Access";
import Overview from './components/dashboard/Overview/Overview';
import Structure from './components/dashboard/Structure/Structure';
import { DataContextProvider } from './components/context/DataContext';

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserAuthContextProvider>
          <DataContextProvider>
            <Routes>
              <Route path='' element={<Navigate to="home" />} />
              <Route path='home' element={<Home />} />
              <Route path='auth' element={<Access />} />
              <Route path='dashboard' element={
                <ProtectedRoute>
                  <Structure />
                </ProtectedRoute>} >
                <Route path='' element={<Navigate to="home" />} />
                <Route path='space' element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>} />
                <Route path='*' element={<Navigate to="home" />} />
                <Route path='home' element={
                  <ProtectedRoute>
                    <Overview />
                  </ProtectedRoute>} />
              </Route>
              <Route path='nvidia' element={
                <ProtectedRoute>
                  <NIM />
                </ProtectedRoute>}
              />
            </Routes>
          </DataContextProvider>
        </UserAuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App