import React from "react";
import { connect } from "react-redux";
import { resetNotifications } from "actions";
import PropTypes from "prop-types";

class Notification extends React.Component {
  state = { clicked: false };

  toggleClickState = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleNotification = () => {
    // if clicked is true
    // run resetNotifications
    // and toggle state
    if (this.state.clicked) {
      this.props.resetNotifications();
      this.toggleClickState();
    } else {
      // else the user must have not clicked off the noti.
      // so run removeNotification
      this.removeNotification();
    }
  };
  // This function exists for the purpose if the user doesnt want to 'X'
  // out of the notification. This way the notification only lingers for
  // a few seconds before it is removed from the DOM.
  removeNotification = () => {
    setTimeout(() => {
      if (this.state.clicked) {
        return;
      }
      this.props.resetNotifications();
    }, 5000);
  };

  render() {
    console.log(this.props);
    const { success, failure } = this.props.errors;

    this.handleNotification();

    return (
      <div
        className={`notification ${this.props.notificationColor}`}
        style={{ marginTop: "20px" }}
      >
        <button className="delete" onClick={this.toggleClickState} />
        <strong>{success || failure}</strong>
      </div>
    );
  }
}

const mapStateToProps = ({ errors }) => {
  return { errors };
};

Notification.propTypes = {
  errors: PropTypes.object.isRequired,
  notificationColor: PropTypes.string,
  resetNotifications: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { resetNotifications }
)(Notification);
