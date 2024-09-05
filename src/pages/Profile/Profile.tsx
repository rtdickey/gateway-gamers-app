import React from "react"

import Button from "components/Button"
import useSession from "hooks/Supabase/useSession"

const Profile: React.FC = () => {
  const { session, handleSignOut } = useSession()
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
