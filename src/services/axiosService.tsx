import axios from 'axios'

export const BASE_URL = `${process.env.SERVER_URL}`

const defaultAxios = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
})

// authAxios.interceptors.request.use(config => {
//   return config
// })

export default defaultAxios