import React from 'react';
import * as actions from 'actions';
import { connect } from 'react-redux';
import BudgetForm 'components/Budgets/BudgetForm';


class BudgetCreate extends React.Component {
  onSubmit = formValues => {
    this.props.addBudget(formValues);
  }

  render() {
    return (
      <div>
        <BudgetForm
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

export default connect(null, actions)(BudgetCreate);
