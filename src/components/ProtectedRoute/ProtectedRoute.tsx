import React from "react"

import { Outlet, useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const navigate = useNavigate()
  if (!isAuthenticated) {
    navigate("/")
  }

  return <>{children}</>
}

export default ProtectedRoute
