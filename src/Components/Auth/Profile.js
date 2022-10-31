import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import './Profile.css'

export default function Profile() {
    const {currentUser} = useAuth()
    //we could add a const variable for the ternary and use it for the alt, but chose a more generic alt instead

  return (
    <span className='profile p-2'>
        {/* Below we call to the current user object to properly greet a logged user. If displayName was null, we display
        currentUser.email. If we have a display name to call upon, we call it using .split: (comment below) */}
        {/* Hello {currentUser.displayName.split(' ')[0]} will show the first name only*/}
        {/* Hello {currentUser.email} */}
        Hello {!currentUser.displayName ? currentUser.email : currentUser.displayName.split(' ')[0]}!
        <img src={currentUser.photoURL} alt='User profile pic' />
    </span>
  )
}
