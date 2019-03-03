import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editTransaction, getTransaction } from "actions";
import TransactionForm from "components/transactions/TransactionForm";
import Spinner from "components/Spinner";

class TransactionEdit extends React.Component {
  componentDidMount() {
    const { budgetId, transactionId } = this.props.match.params;
    this.props.getTransaction(budgetId, transactionId);
  }

  onSubmit = (id, formValues) => {
    const { budgetId, transactionId } = this.props.match.params;

    this.props.editTransaction(budgetId, transactionId, formValues);
  };

  render() {
    const { transaction, loading } = this.props;

    if (!transaction || loading) {
      return <Spinner />;
    }

    return (
      <div>
        <h3>Edit a Transaction</h3>
        <TransactionForm
          initialValues={_.pick(transaction, "description", "amount")}
          onSubmit={this.onSubmit}
          budgetId={this.props.match.params.budgetId}
        />
      </div>
    );
  }
}

TransactionEdit.propTypes = {
  editTransaction: PropTypes.func.isRequired
};

const mapStateToProps = ({ budgets }) => {
  return { transaction: budgets.transaction, loading: budgets.loading };
};

export default connect(
  mapStateToProps,
  { editTransaction, getTransaction }
)(TransactionEdit);
