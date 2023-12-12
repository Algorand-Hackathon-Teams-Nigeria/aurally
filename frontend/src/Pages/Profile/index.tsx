import { useAtom } from 'jotai'
import { aurallyCreativeAtom } from '../../store/contractAtom'
import React from 'react'
import UserProfile from './UserProfile'
import RegistrationForm from './RegisterationForm'

const Profile = () => {
  const [user] = useAtom(aurallyCreativeAtom)

  return <React.Fragment>{user ? <UserProfile creative={user} /> : <RegistrationForm />}</React.Fragment>
}

export default Profile
