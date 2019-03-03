import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTransaction } from "actions";
import TransactionForm from "components/transactions/TransactionForm";

class TransactionNew extends React.Component {
  onSubmit = (id, formValues) => {
    const { budgetId } = this.props.match.params;

    this.props.addTransaction(budgetId, formValues);
  };

  render() {
    const { budgetId } = this.props.match.params;

    return (
      <div>
        <TransactionForm onSubmit={this.onSubmit} budgetId={budgetId} />
      </div>
    );
  }
}

TransactionNew.propTypes = {
  addTransaction: PropTypes.func.isRequired
};

export default connect(
  null,
  { addTransaction }
)(TransactionNew);
