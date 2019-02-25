import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import * as actions from "actions";
import BudgetForm from "components/budgets/BudgetForm";

class BudgetEdit extends React.Component {
  componentDidMount() {
    const { budgetId } = this.props.match.params;

    this.props.fetchBudget(budgetId);
  }

  onSubmit = formValues => {
    const { budgetId } = this.props.match.params;

    this.props.editBudget(budgetId, formValues);
  };

  render() {
    return (
      <div>
        <BudgetForm
          onSubmit={this.onSubmit}
          initialValues={_.pick(
            this.props.budget,
            "amount",
            "description",
            "title",
            "endDate",
            "startDate"
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
};

export default connect(
  mapStateToProps,
  actions
)(BudgetEdit);
