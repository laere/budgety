import React from "react";
import Modal from "components/Modal";
import { connect } from "react-redux";
import { deleteTransaction } from "actions";
import { Link } from "react-router-dom";

class TransactionDelete extends React.Component {
  renderActions() {
    const { budgetId } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteTransaction(budgetId)}
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
          title="Delete Budget"
          content="Are you sure you want to delete this budget?"
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
