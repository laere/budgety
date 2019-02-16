import 'css/BudgetForm.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import BudgetField from 'components/budgets/BudgetField';
import formFields from 'components/budgets/formFields';

class BudgetForm extends React.Component {
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  renderFields() {
    return formFields.map(({ label, name, type }) => {
      return <Field key={name} label={label} name={name} type={type} component={BudgetField} />
    });
  }

  render() {
    return (
      <div className="budget-new">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Link to="/budgets" type="submit" className="button is-danger is-large">Cancel</Link>
          <button type="submit" className="button is-primary is-large">Done</button>
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
})(BudgetForm);
