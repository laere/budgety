import React from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import * as actions from "actions";
import { Link } from "react-router-dom";
import formFields from "components/budgets/formFields";
import BudgetField from "components/budgets/BudgetField";

class TransactionNew extends React.Component {
  onSubmit = formValues => {
    const { budgetId } = this.props.match.params;

    this.props.addTransaction(budgetId, formValues);
  };

  render() {
    const { budgetId } = this.props.match.params;

    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field
            key="description"
            label="description"
            name="description"
            type="text"
            component={BudgetField}
          />
          <Field
            key="amount"
            label="amount"
            name="amount"
            type="number"
            component={BudgetField}
          />
          <Link
            to={`/budgets/${budgetId}`}
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

  formFields.forEach(({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = "You must provide a value!";
    }
  });

  return errors;
};

export default reduxForm({
  form: "transactionNew",
  validate
})(
  connect(
    null,
    actions
  )(TransactionNew)
);
