import React from "react";
import ModalContainer from "components/ModalContainer";
import { connect } from "react-redux";
import { deleteCheck } from "actions/checks/checkActions";
import PropTypes from "prop-types";

class CheckDelete extends React.Component {
  handleActionCreator = () => {
    const { budgetId, checkId } = this.props.match.params;
    this.props.deleteCheck(budgetId, checkId);
  };

  render() {
    const { budgetId } = this.props.match.params;

    return (
      <React.Fragment>
        <ModalContainer
          title="Delete Check"
          content="Are you sure you want to delete this check?"
          actionCreator={this.handleActionCreator}
          cancelpath={`/budgets/${budgetId}`}
        />
      </React.Fragment>
    );
  }
}

CheckDelete.propTypes = {
  deleteCheck: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteCheck }
)(CheckDelete);
