import { createContext, useContext, useReducer } from 'react'

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'login': {
      return { ...state, current: action.payload }
    }
    case 'logout': {
      return { ...state, current: null }
    }
    case 'setUser': {
      return { ...state, current: action.payload }
    }
    case 'setAll': {
      return { ...state, all: action.payload }
    }
    default:
      return state
  }
}

const UsersContext = createContext()

export const useUsers = () => {
  const tokenAndDispatch = useContext(UsersContext)
  return tokenAndDispatch[0]
}

export const useUsersDispatch = () => {
  const tokenAndDispatch = useContext(UsersContext)
  return tokenAndDispatch[1]
}

export const UsersContextProvider = (props) => {
  const [users, usersDispatch] = useReducer(usersReducer, {
    all: [],
    current: null
  })

  return (
    <UsersContext.Provider value={[users, usersDispatch]}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext
