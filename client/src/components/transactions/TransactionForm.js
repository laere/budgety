import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import formFields from "components/budgets/formFields";
import BudgetField from "components/budgets/BudgetField";

class TransactionForm extends React.Component {
  onSubmit = formValues => {
    this.props.onSubmit(this.props.budgetId, formValues);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            key="description"
            label="Description"
            name="description"
            type="text"
            component={BudgetField}
          />
          <Field
            key="amount"
            label="Amount"
            name="amount"
            type="number"
            component={BudgetField}
          />
          <Link
            to={`/budgets/${this.props.budgetId}`}
            className="button is-danger is-large"
          >
            Cancel
          </Link>
          <button type="submit" className="button is-primary is-large">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  formFields.forEach(({ name, required, validationMsg }) => {
    if (required && !values[name]) {
      errors[name] = validationMsg;
    }
  });

  return errors;
};

export default reduxForm({
  form: "transactionForm",
  enableReinitialize: true,
  validate
})(TransactionForm);