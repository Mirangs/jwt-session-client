import React, { useEffect } from 'react'
import { useAppSelector } from 'app/hooks'
import { selectUsers } from './usersSlice'

const Users = () => {
  const { users } = useAppSelector(selectUsers)
  useEffect(() => {}, [])

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <p>Email: {user.email}</p>
          <p>Is activated: {user.isActivated ? 'Yes' : 'No'}</p>
        </li>
      ))}
    </ul>
  )
}

export default Users
