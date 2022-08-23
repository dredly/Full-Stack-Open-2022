import { connect } from 'react-redux'

const Notification = (props) => {
  const display = props.notification.isShown ? '' : 'none'
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: display
  }
  return (
    <div style={style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)