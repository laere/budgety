import React from "react";
import { connect } from "react-redux";
import { resetOnSuccessMessage } from "actions/budgets/budgetActions";

class Notification extends React.Component {
  state = { clicked: false };

  handleNotificaiton = () => {
    // if clicked is true
    // run resetOnSuccessMessage
    if (this.state.clicked) {
      this.props.resetOnSuccessMessage();
      this.setState({ clicked: false });
    } else {
      // else
      // run defaultRemoveNotification
      this.removeNotification();
    }
  };

  // This function exists for the purpose if the user doesnt want to 'X'
  // out of the notification. This way the notification only lingers for
  // a few seconds before it is removed from the DOM.
  removeNotification = () => {
    setTimeout(() => {
      if (this.state.clicked === true) {
        return;
      }
      this.props.resetOnSuccessMessage();
    }, 3000);
  };

  render() {
    const { message, resetOnSuccessMessage } = this.props;
    {
      this.handleNotificaiton();
    }
    return (
      <div className="notification is-primary" style={{ marginTop: "20px" }}>
        <button
          className="delete"
          onClick={() => this.setState({ clicked: true })}
        />
        {message.success}
      </div>
    );
  }
}

const mapStateToProps = ({ budgets: { message } }) => {
  return { message };
};

export default connect(
  mapStateToProps,
  { resetOnSuccessMessage }
)(Notification);
