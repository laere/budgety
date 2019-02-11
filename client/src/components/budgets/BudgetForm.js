import 'css/BudgetForm.css';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from 'actions';
import BudgetField from 'components/budgets/BudgetField';

const FIELDS = [
  { label: 'Budget Title', name: "title", type: "text", required: true },
  { label: 'Budget Description', name: "description", type: "text", required: true },
  { label: 'Budget Amount', name: "amount", type: "number", required: true },
  { label: 'Budget Start Date', name: "startDate", type: "date", required: true },
  { label: 'Budget End Date', name: "endDate", type: "date", required: true }
];

class BudgetForm extends React.Component {
  OnSubmit = formValues => {
    this.props.addBudget(formValues)
  }

  renderFields() {
    return FIELDS.map(({ label, name, type }) => {
      return <Field key={name} label={label} name={name} type={type} component={BudgetField} />
    });
  }

  render() {
    return (
      <div className="budget-new">
        <form onSubmit={this.props.handleSubmit(this.OnSubmit)}>
          {this.renderFields()}
          <button type="submit" className="button is-primary is-large">Create Budget</button>
        </form>
      </div>
    );
  }
};

const validate = values => {
  const errors = {};

  FIELDS.forEach(({ name, required }) => {
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
