import React from "react";
import { connect } from "react-redux";
import { resetNotifications } from "actions";
import PropTypes from "prop-types";

class Notification extends React.Component {
  render() {
    const { success, failure } = this.props.errors;

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
