import React from "react"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import Button from "components/Button"
import useSession from "hooks/Supabase/useSession"
import { supabase } from "Supabase"

const Login: React.FC = () => {
  const { isAuthenticated } = useSession()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate("/GameKeep")
  }

  const handleOtpAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: "ryantay87@gmail.com",
      options: {
        // set this to false if you do not want the user to be automatically signed up
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
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "hsl(15.49 100% 64.31%)",
                brandAccent: "hsl(15.49 100% 64.31% / .9)",
                brandButtonText: "hsl(0, 0%, 0%)",
              },
            },
            dark: {
              colors: {
                brandButtonText: "white",
                defaultButtonBackground: "hsl(210 40% 98%)",
                defaultButtonBackgroundHover: "hsl(210 40% 98% / .9)",
              },
            },
          },
        }}
      />
    </div>
  )
}

export default Login
