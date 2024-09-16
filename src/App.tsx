import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Layout from "components/Layout"
import ProtectedRoute from "components/ProtectedRoute/ProtectedRoute"
import useSession from "hooks/Supabase/useSession"
import GameKeep from "pages/GameKeep"
import Home from "pages/Home"
import Login from "pages/Login"
import NotFound from "pages/NotFound"
import Profile from "pages/Profile"

import "./App.css"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const { isAuthenticated } = useSession()

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route
            path='GameKeep'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <GameKeep />
              </ProtectedRoute>
            }
          />
          <Route
            path='Profile'
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer position='top-center' />
    </div>
  )
}

export default App
