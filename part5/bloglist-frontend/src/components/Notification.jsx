const Notification = ({ notification }) => {
  if (notification === null) return null
  if (notification.className === undefined) notification.className = 'infoNotification'
  return (
    <div className={notification.className}>
      {notification.text}
    </div>
  )
}

export default Notification