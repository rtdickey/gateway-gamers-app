import React, { useEffect, useState } from "react"

import { Session } from "@supabase/supabase-js"
import { Routes, Route, useNavigate } from "react-router-dom"

import Layout from "components/Layout"
import GameKeep from "pages/GameKeep"
import Home from "pages/Home"
import Login from "pages/Login"
import Profile from "pages/Profile"

import { supabase } from "./Supabase"

import "./App.css"

function App() {
  const [currentSession, setCurrentSession] = useState<Session | null>(null)
  const navigate = useNavigate()

  const handleSignOut = () => {
    supabase.auth.signOut()
    navigate("/")
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div className='App'>
      {!currentSession ? (
        <Login supabase={supabase} />
      ) : (
        <>
          <Routes>
            <Route path='/' element={<Layout session={currentSession} />}>
              <Route index element={<Home session={currentSession} />} />
              <Route path='Login' element={<Login supabase={supabase} />} />
              <Route path='GameKeep' element={<GameKeep user={currentSession.user} handleSignOut={handleSignOut} />} />
              <Route path='Profile' element={<Profile />} />
            </Route>
          </Routes>
        </>
      )}

      {/* <ul>{shelves?.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)}</ul> */}
    </div>
  )
}

export default App
