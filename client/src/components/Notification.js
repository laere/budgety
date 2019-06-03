import React from "react";
import { connect } from "react-redux";
import { resetNotifications } from "actions";
import PropTypes from "prop-types";

class Notification extends React.Component {
  handleNotifications() {
    // If user doesn't X out of notification then
    // after 5 seconds we reset the messages anyways
    setTimeout(() => this.props.resetNotifications(), 5000);
  }

  render() {
    const { success, failure } = this.props.errors;

    this.handleNotifications();

    return (
      <div
        className={`notification ${this.props.notificationColor}`}
        style={{ marginTop: "20px" }}
      >
        <button className="delete" onClick={this.props.resetNotifications} />
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
