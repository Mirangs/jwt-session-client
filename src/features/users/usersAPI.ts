import { AxiosResponse } from 'axios'
import $api from '../../http'
import { User } from '../../models/User'

export const fetchUsers = async (): Promise<AxiosResponse<User[]>> =>
  $api.get('/users')
