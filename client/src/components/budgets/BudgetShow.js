import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class BudgetShow extends React.Component {
  componentDidMount() {
    const { budgetId } = this.props.match.params;

    console.log(budgetId);

    this.props.fetchBudget(budgetId);
  }

  render() {
    console.log(this.props.budget);
    return (
      <div>
        Budget Show
      </div>
    );
  }
}

export default connect(null, actions)(BudgetShow);
