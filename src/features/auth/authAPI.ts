import { AxiosResponse, default as axios } from 'axios'
import $api from '../../http'
import { AuthResponse } from '../../models/response/AuthResponse'

export const login = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> =>
  $api.post('/login', { email, password })

export const registration = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> =>
  $api.post('/registration', { email, password })

export const logout = async (): Promise<void> => $api.post('/logout')

export const checkAuth = async (): Promise<AxiosResponse<AuthResponse>> => {
  const API_URL = process.env.REACT_APP_API_URL
  return axios.get<AuthResponse>(`${API_URL}/refresh`, {
    withCredentials: true,
  })
}
