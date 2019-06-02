import React from "react";
import { connect } from "react-redux";
import { addTransaction } from "actions/transactions/transactionActions";
import formFields from "components/transactions/formFields";
import GlobalForm from "components/GlobalForm";
import transactionValidation from "validation/transactionValidation";
import PropTypes from "prop-types";

class TransactionNew extends React.Component {
  handleActionCreator = values => {
    const { budgetId } = this.props.match.params;
    this.props.addTransaction(budgetId, values);
  };

  render() {
    const { budgetId } = this.props.match.params;
    return (
      <React.Fragment>
        <GlobalForm
          formFields={formFields}
          validateFunc={transactionValidation}
          actionCreator={this.handleActionCreator}
          initialValues={{ description: "", amount: "" }}
          cancelpath={`/budgets/${budgetId}`}
          id={budgetId}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { addTransaction }
)(TransactionNew);
