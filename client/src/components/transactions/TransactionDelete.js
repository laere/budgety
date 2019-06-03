import React from "react";
import ModalContainer from "components/ModalContainer";
import { connect } from "react-redux";
import { deleteTransaction } from "actions/transactions/transactionActions";
import PropTypes from "prop-types";

class TransactionDelete extends React.Component {
  handleActionCreator = () => {
    const { budgetId, transactionId } = this.props.match.params;
    this.props.deleteTransaction(budgetId, transactionId);
  };

  render() {
    const { budgetId } = this.props.match.params;

    return (
      <React.Fragment>
        <ModalContainer
          title="Delete Transaction"
          content="Are you sure you want to delete this transaction?"
          actionCreator={this.handleActionCreator}
          cancelpath={`/budgets/${budgetId}`}
        />
      </React.Fragment>
    );
  }
}

TransactionDelete.propTypes = {
  deleteTransaction: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteTransaction }
)(TransactionDelete);
