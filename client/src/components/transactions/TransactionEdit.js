import React from "react";
import { connect } from "react-redux";
import { editTransaction } from "actions/transactions/transactionActions";
import Spinner from "components/Spinner";
import formFields from "components/transactions/formFields";
import GlobalForm from "components/GlobalForm";
import transactionValidation from "validation/transactionValidation";

class TransactionEdit extends React.Component {
  handleActionCreator = values => {
    const { budgetId, transactionId } = this.props.match.params;
    this.props.editTransaction(budgetId, transactionId, values);
  };

  render() {
    const { transactions } = this.props.budget;
    const { budgetId, transactionId } = this.props.match.params;

    if (!transactions) {
      return <Spinner />;
    }

    const currentTransaction = transactions.find(
      id => id._id === transactionId
    );

    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={transactionValidation}
          actionCreator={this.handleActionCreator}
          initialValues={{
            description: currentTransaction.description,
            amount: currentTransaction.amount
          }}
          cancelpath={`/budgets/${budgetId}`}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ budgets }) => {
  return {
    transaction: budgets.transaction,
    budget: budgets.budget,
    loading: budgets.loading
  };
};

export default connect(
  mapStateToProps,
  { editTransaction }
)(TransactionEdit);
