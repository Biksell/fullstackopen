const Notification = ({ notification }) => {
  if (notification === null || notification.message === '') return null

  const notifStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  notifStyle.color = notification.type === 'error' ? 'red' : 'green'

  return (
    <div className="notification" style={notifStyle}>
      {notification.message}
    </div>
  )
}

export default Notification
