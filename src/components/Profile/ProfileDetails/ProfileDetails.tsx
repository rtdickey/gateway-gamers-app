import { Card, CardContent } from "components/ui/Card"
import { User } from "types"

interface ProfileDetailsProps {
  user: User
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  return (
    <Card className='p-2'>
      <CardContent>
        <h2 className='text-xl font-semibold'>Profile</h2>
        <p>Email: {user.email}</p>
        <p>Name: {user.display_name}</p>
      </CardContent>
    </Card>
  )
}

export default ProfileDetails
