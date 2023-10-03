import PropTypes from 'prop-types'

const Notification = ({ notification }) => {
  if (notification === null) return null
  if (notification.className === undefined) notification.className = 'infoNotification'

  return (
    <div className={notification.className}>
      {notification.text}
    </div>
  )
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification