interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps) => {
  const { message } = props;
  return <div>{message}</div>;
};

export default Notification;
