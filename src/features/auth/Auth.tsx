import React, { SyntheticEvent, useState } from 'react'

import { useAppDispatch } from 'app/hooks'
import { login, register } from './authSlice'
import { getUsers } from '../users/usersSlice'

const Auth: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => dispatch(login({ email, password }))}>
        Login
      </button>
      <button onClick={() => dispatch(register({ email, password }))}>
        Register
      </button>
      <button onClick={() => dispatch(getUsers())}>Get users</button>
    </form>
  )
}

export default Auth
