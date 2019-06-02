import React from "react";
import Modal from "components/Modal";
import { connect } from "react-redux";
import { deleteTransaction } from "actions/transactions/transactionActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class TransactionDelete extends React.Component {
  renderActions() {
    const { budgetId, transactionId } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteTransaction(budgetId, transactionId)}
          className="button is-danger"
        >
          Delete
        </button>
        <Link to={`/budgets/${budgetId}`} className="button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          title="Delete Transaction"
          content="Are you sure you want to delete this transaction?"
          actions={this.renderActions()}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { deleteTransaction }
)(TransactionDelete);
