import React, { useState } from "react"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Button from "components/Button"
import useSession from "hooks/Supabase/useSession"
import { supabase } from "Supabase"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const { isAuthenticated } = useSession()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate("/GameKeep")
  }

  const handleOtpAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: "ryantay87@gmail.com",
      options: {
        shouldCreateUser: true,
      },
    })
    if (error) {
      console.error("Error:", error.message)
      toast.error(error.message, { theme: "colored" })
      return
    }
    navigate("/Welcome")
  }

  return (
    <div style={{ width: "300px", margin: "0 auto", marginTop: "4em" }}>
      <Button onClick={handleOtpAuth}>Login with OTP</Button>
    </div>
  )
}

export default Login
