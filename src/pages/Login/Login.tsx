import React, { useState } from "react"

import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import logo from "assets/gateway-gamers-logo.png"
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
    if (!email) {
      toast.error("Email is required", { theme: "colored" })
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email,
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
    <div className='w-full max-w-xs m-auto'>
      <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <img src={logo} alt='Gateway Gamers' className={`w-20 m-auto`} />
        </div>
        <div className='mb-4'>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='text'
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className='flex items-center justify-between'>
          <Button
            onClick={handleOtpAuth}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
