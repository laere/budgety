import React from "react";
import ModalContainer from "components/ModalContainer";
import { connect } from "react-redux";
import { deleteBudget } from "actions/budgets/budgetActions";
import PropTypes from "prop-types";

class BudgetDelete extends React.Component {
  handleActionCreator = () => {
    const { budgetId } = this.props.match.params;
    this.props.deleteBudget(budgetId);
  };

  render() {
    const { budgetId } = this.props.match.params;

    return (
      <React.Fragment>
        <ModalContainer
          title="Delete Budget"
          content="Are you sure you want to delete this budget?"
          actionCreator={this.handleActionCreator}
          cancelpath={`/budgets/${budgetId}`}
        />
      </React.Fragment>
    );
  }
}

BudgetDelete.propTypes = {
  deleteBudget: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBudget }
)(BudgetDelete);
