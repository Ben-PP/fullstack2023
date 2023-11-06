import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'setInfo':
      return {
        message: action.payload,
        className: 'infoNotification'
      }
    case 'setSuccess':
      return {
        message: action.payload,
        className: 'successNotification'
      }
    case 'setError':
      return {
        message: action.payload,
        className: 'errorNotification'
      }
    case 'clear':
      return {
        message: null,
        className: 'infoNotification'
      }
    default:
      return state
  }
}

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(notificationReducer, {
    message: null,
    className: 'infoNotification'
  })

  return (
    <NotificationContext.Provider
      value={[
        message,
        (props) => {
          setTimeout(() => {
            messageDispatch({ type: 'clear' })
          }, 3000)
          messageDispatch(props)
        }
      ]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
