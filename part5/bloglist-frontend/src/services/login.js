import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/login`

const login = async credentials => {
  console.log(import.meta.env.MODE)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }