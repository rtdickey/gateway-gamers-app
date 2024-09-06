import React from "react"

import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useNavigate } from "react-router-dom"

import useSession from "hooks/Supabase/useSession"
import { supabase } from "Supabase"

const Login: React.FC = () => {
  const { isAuthenticated } = useSession()
  const navigate = useNavigate()

  if (isAuthenticated) {
    navigate("/GameKeep")
  }

  return (
    <div style={{ width: "300px", margin: "0 auto", marginTop: "4em" }}>
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
