import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { User } from 'models/User'
import { fetchUsers } from './usersAPI'

export interface AuthState {
  users: User[]
  isLoading: boolean
}

const initialState: AuthState = {
  users: [],
  isLoading: false,
}

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const { data } = await fetchUsers()
  return data
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload
      })
  },
})

export const selectUsers = (state: RootState) => state.users

export default authSlice.reducer
