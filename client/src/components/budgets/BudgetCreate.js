import React from "react";
import { addBudget } from "actions";
import { connect } from "react-redux";
import BudgetForm from "components/budgets/BudgetForm";

class BudgetCreate extends React.Component {
  onSubmit = formValues => {
    this.props.addBudget(formValues);
  };

  render() {
    return (
      <div>
        <BudgetForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  { addBudget }
)(BudgetCreate);
