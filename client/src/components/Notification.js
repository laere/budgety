import React from "react";
import { connect } from "react-redux";
import { resetOnSuccessMessage } from "actions/budgets/budgetActions";

class Notification extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div class="notification is-primary" style={{ marginTop: "20px" }}>
        <button
          className="delete"
          onClick={() => this.props.resetOnSuccessMessage()}
        />
        {this.props.message.success}
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
