import { IUser } from '@/types/user'
import { AxiosResponse } from 'axios'
import defaultAxios from './axiosService'

export interface ILoginData {
  email: string
  password: string
}

export interface IRegisterData {
  email: string
  fullName: string
  password: string
}

const userService = {

  async login({ email, password }: ILoginData): Promise<AxiosResponse<IUser>> {
    let resp = await this.getUser(email)

    if (!resp.data || resp.data.password !== password) throw new Error('Incorrect email or password')

    return new Promise(res => res(resp))
  },

  async register(data: IRegisterData): Promise<AxiosResponse<IUser>> {
    return defaultAxios.post<IUser>('/users', data)
  },

  async getUser(email: string): Promise<AxiosResponse<IUser>> {
    const resp = await defaultAxios.get<IUser[]>(`/users?email=${email}`)
    // I make this because "json-server" send array
    const newResp: AxiosResponse<IUser> = { ...resp, data: resp.data[0] }
    return new Promise(r => r(newResp))
  }

}

export default userService