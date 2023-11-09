import PropTypes from 'prop-types'
import { useNotificationMessage } from '../../contexts/NotificationContext'

const Notification = () => {
  const notification = useNotificationMessage()
  if (notification.message === null) return null
  return <div className={notification.className}>{notification.message}</div>
}

Notification.propTypes = {
  notification: PropTypes.object
}

export default Notification
