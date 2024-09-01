import React from "react"

import { Session } from "@supabase/supabase-js"

import Button from "components/Button"

interface ProfileProps {
  session: Session | null
  handleSignOut: () => void
}

const Profile: React.FC<ProfileProps> = ({ session, handleSignOut }) => {
  const user = session?.user

  return (
    <>
      <div>
        <h1>Welcome, {user?.email}</h1>
        <Button variant='link' className='mt-2' onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </>
  )
}

export default Profile
