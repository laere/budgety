import 'css/BudgetForm.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from 'actions';
import BudgetField from 'components/budgets/BudgetField';
import formFields from 'components/budgets/formFields';

class BudgetForm extends React.Component {
  OnSubmit = formValues => {
    this.props.addBudget(formValues);
  }

  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return <Field key={name} label={label} name={name} type={type} component={BudgetField} />
    });
  }

  render() {
    return (
      <div className="budget-new">
        <form onSubmit={this.props.handleSubmit(this.OnSubmit)}>
          {this.renderFields()}
          <Link to="/budgets" type="submit" className="button is-danger is-large">Cancel</Link>
          <button type="submit" className="button is-primary is-large">Create Budget</button>
        </form>
      </div>
    );
  }
};

const validate = values => {
  const errors = {};

  formFields.forEach(({ name, required }) => {
    if (required && !values[name]) {
      errors[name] = 'You must provide a value!'
    }
  });

  return errors;
}

export default reduxForm({
  form: 'budgetForm',
  validate
})(connect(null, actions)(BudgetForm));
