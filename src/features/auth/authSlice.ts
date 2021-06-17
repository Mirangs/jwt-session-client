import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { User } from '../../models/User'
import {
  login as fetchLogin,
  registration as fetchRegister,
  logout as fetchLogout,
  checkAuth as fetchCheckAuth,
} from './authAPI'

export interface AuthState {
  user: User
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: {
    email: '',
    id: '',
    isActivated: false,
  },
  isAuthenticated: false,
  isLoading: false,
}

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await fetchLogin(email, password)
    localStorage.setItem('token', data.accessToken)
    return data.user
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await fetchRegister(email, password)
    localStorage.setItem('token', data.accessToken)
    return data.user
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await fetchLogout()
  localStorage.removeItem('token')
})

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const { data } = await fetchCheckAuth()
  localStorage.setItem('token', data.accessToken)
  return data.user
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuthenticated(state, isAuthenticated: PayloadAction<boolean>) {
      state.isAuthenticated = isAuthenticated.payload
    },
    setUser(state, user: PayloadAction<User>) {
      state.user = user.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.isLoading = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = initialState.user
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false
      })
  },
})

export const { setIsAuthenticated, setUser } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth

export default authSlice.reducer
