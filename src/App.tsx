import React, { useEffect, useState } from "react"

import { Session } from "@supabase/supabase-js"
import { Routes, Route, useNavigate } from "react-router-dom"

import Layout from "components/Layout"
import Home from "pages/Home"
import Keep from "pages/Keep"
import Login from "pages/Login"

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
              <Route path='GameKeep' element={<Keep user={currentSession.user} handleSignOut={handleSignOut} />} />
            </Route>
          </Routes>
        </>
      )}

      {/* <ul>{shelves?.map((shelf) => <li key={shelf.id}>{shelf.name}</li>)}</ul> */}
    </div>
  )
}

export default App
