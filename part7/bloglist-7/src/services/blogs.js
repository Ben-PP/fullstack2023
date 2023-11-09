import axios from 'axios'
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/blogs`

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const createComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { comment })
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default {
  getAll,
  create,
  update,
  deleteBlog,
  setToken,
  createComment
}
