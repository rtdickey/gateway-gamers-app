import React, { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { SignIn, VerifyCode } from "components/Login"
import { useSession } from "hooks/Supabase/useSession"
import { supabase } from "Supabase"

const Login: React.FC = () => {
  const [email, setEmail] = useState("")
  const [linkSent, setLinkSent] = useState(false)
  const { isAuthenticated } = useSession()

  const navigate = useNavigate()

  const handleVerifyCode = async (token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: "email" })

    if (error) {
      toast.error(error.message, { theme: "colored" })
    } else if (data) {
      navigate("/GameKeep")
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/GameKeep")
    }
  }, [isAuthenticated, navigate])

  return (
    <div className='w-full max-w-xs m-auto'>
      {linkSent ? (
        <VerifyCode handleVerifyCode={handleVerifyCode} />
      ) : (
        <SignIn setLinkSent={setLinkSent} email={email} setEmail={setEmail} />
      )}
    </div>
  )
}

export default Login
