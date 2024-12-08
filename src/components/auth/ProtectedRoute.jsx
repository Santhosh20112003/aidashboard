import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext'

function ProtectedRoute({ children }) {
  const { user } = useUserAuth();
  // console.log(user);
  if (!user) {
    return <Navigate to="/home" />
  }
  else {
    localStorage.setItem("codespark", user.accessToken);
    return children;
  }

}

export default ProtectedRoute
