import React from "react"

import Button from "components/Button"
import { Card, CardContent, CardFooter } from "components/Card"
import useSession from "hooks/Supabase/useSession"

const Profile: React.FC = () => {
  const { session, handleSignOut } = useSession()
  const user = session?.user

  return (
    <div className='w-full max-w-xs m-auto'>
      <Card className='p-2'>
        <CardContent>
          <h2 className='text-xl font-semibold'>Profile</h2>
          <p>Email: {user?.email}</p>
          <p>Name: </p>
        </CardContent>
        <CardFooter>
          <div className='flex-1 justify-end'>
            <Button variant='destructive' className='mt-2' onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Profile
