import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import InputField from "components/InputField";
import { connect } from "react-redux";
import { addTransaction } from "actions";
import formFields from "components/transactions/formFields";
import GlobalForm from "components/GlobalForm";
import transactionValidation from "validation/transactionValidation";

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
