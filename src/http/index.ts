import axios from 'axios'
import { AuthResponse } from 'models/response/AuthResponse'

const API_URL = process.env.REACT_APP_API_URL

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (err) => {
    try {
      const originalRequest = err.config
      if (err.response.status === 401) {
        const res = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem('token', res.data.accessToken)
        return $api.request(originalRequest)
      }
    } catch (e) {
      console.log(e)
    }
  }
)

export default $api
