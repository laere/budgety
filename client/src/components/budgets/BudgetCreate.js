import React from "react";
import { addBudget } from "actions";
import { connect } from "react-redux";
import BudgetForm from "components/budgets/BudgetForm";

class BudgetCreate extends React.Component {
  render() {
    return (
      <div>
        <BudgetForm onSubmit={this.props.addBudget} />
      </div>
    );
  }
}

export default connect(
  null,
  { addBudget }
)(BudgetCreate);
