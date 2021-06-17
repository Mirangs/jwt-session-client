import React, { useEffect } from 'react'
import Auth from './features/auth/Auth'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { checkAuth, selectAuth, logout } from './features/auth/authSlice'
import { getUsers } from './features/users/usersSlice'
import Users from 'features/users/Users'

function App() {
  const dispatch = useAppDispatch()
  const { isAuthenticated, user, isLoading } = useAppSelector(selectAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!isAuthenticated) {
    return <Auth />
  }

  return (
    <div className="App">
      {!!user.isActivated && <h1>Authenticated as {user.email}</h1>}
      {!user.isActivated && <h1>Please activate account</h1>}
      <button onClick={() => dispatch(getUsers())}>Get users</button>
      <button onClick={() => dispatch(logout())}>Logout</button>
      <Users />
    </div>
  )
}

export default App
