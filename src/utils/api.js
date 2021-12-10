import axios from 'axios'

const api = axios.create({
  baseURL: "https://amigo-secreto-lac.vercel.app/"
})

export default api