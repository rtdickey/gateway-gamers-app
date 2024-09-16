import { useMemo } from "react"

import { User as supabaseUser } from "@supabase/supabase-js"
import { Field, Formik, FormikHelpers } from "formik"

import { useUpdateUserDetailsMutation } from "services/userApi"
import { User } from "types"

interface EditProfileDetailsProps {
  user: supabaseUser
}

const EditProfileDetails: React.FC<EditProfileDetailsProps> = ({ user }) => {
  const [upsertUserDetails] = useUpdateUserDetailsMutation()

  const initialValues = useMemo(() => {
    return {
      id: user.id,
      email: user.email,
      display_name: "",
    } as User
  }, [user])

  const handleSubmit = async (values: User, { setSubmitting }: FormikHelpers<User>) => {
    upsertUserDetails(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {props => (
        <form onSubmit={props.handleSubmit}>
          <h1>Edit Profile Details</h1>
          <Field name='email' type='email' placeholder='Email' value={props.values.email} />
          <Field name='display_name' type='text' placeholder='Name' value={props.values.display_name} />
          <button type='submit'>Save</button>
        </form>
      )}
    </Formik>
  )
}

export default EditProfileDetails
