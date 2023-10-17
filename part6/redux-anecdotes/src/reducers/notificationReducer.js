import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    removeMessage(state, action) {
      action.payload = ''
      return ''
    }
  }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return async dispatch => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, timeout !== null ? timeout * 1000 : 3000)
  }
}

export default notificationSlice.reducer