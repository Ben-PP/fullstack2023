const success = (message, setNotification) => {
  setNotification({
    text: message,
    className: 'successNotification'
  })
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}
const info = (message, setNotification) => {
  setNotification({
    text: message,
    className: 'infoNotification'
  })
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}
const error = (message, setNotification) => {
  setNotification({
    text: message,
    className: 'errorNotification'
  })
  setTimeout(() => {
    setNotification(null)
  }, 5000)
}

export default { success, error, info }