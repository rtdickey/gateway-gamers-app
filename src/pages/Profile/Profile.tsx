import React from "react"

import { skipToken } from "@reduxjs/toolkit/query"

import Button from "components/Button"
import EditProfileDetails from "components/Profile/EditProfileDetails"
import ProfileDetails from "components/Profile/ProfileDetails"
import useSession from "hooks/Supabase/useSession"
import { useGetUserDetailsQuery } from "services/userApi"

const Profile: React.FC = () => {
  const { session, handleSignOut } = useSession()
  const user = session?.user

  const {
    data: userDetails,
    isLoading: userDetailsLoading,
    isError: userDetailsError,
  } = useGetUserDetailsQuery(user ? { id: user.id } : skipToken)
  console.log(userDetails)

  return (
    <div className='w-full max-w-xs m-auto'>
      {userDetailsLoading && <p>Loading...</p>}
      {userDetailsError && <p>Error retrieving your details</p>}
      {!userDetailsLoading && !userDetailsError && userDetails && <ProfileDetails user={userDetails} />}
      {!userDetails && !!user && <EditProfileDetails user={user} />}
      <div className='flex-1 justify-end'>
        <Button variant='destructive' className='mt-2' onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default Profile
