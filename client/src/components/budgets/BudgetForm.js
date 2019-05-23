import "css/BudgetForm.css";
import React from "react";
import { Link } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import { reduxForm, Field } from "redux-form";
import formFields from "components/budgets/formFields";
import BudgetField from "components/budgets/BudgetField";

class BudgetForm extends React.Component {
  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return (
        <Field
          key={name}
          label={label}
          name={name}
          type={type}
          component={BudgetField}
        />
      );
    });
  }

  onSubmit = formValues => {
    // console.log(formValues);
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div className="budget-new">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Link
            to="/budgets"
            type="submit"
            className="button is-danger is-large"
          >
            Cancel
          </Link>
          <button type="submit" className="button is-primary is-large">
            Done
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
  form: "budgetForm",
  enableReinitialize: true,
  validate
})(BudgetForm);
