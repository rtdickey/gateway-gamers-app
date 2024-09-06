import React, { useEffect } from "react"

import { useNavigate } from "react-router-dom"

interface ProtectedRouteProps {
  isAuthenticated: boolean
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login")
    }
  }, [isAuthenticated, navigate])

  return <>{children}</>
}

export default ProtectedRoute
