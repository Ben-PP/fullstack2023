import axios from 'axios'
const baseUrl = 'https://blog-back.huone105.com/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }