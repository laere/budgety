import React from "react";
import { connect } from "react-redux";
import {
  fetchBudgets,
  resetOnSuccessMessage
} from "actions/budgets/budgetActions";
import Spinner from "components/Spinner";
import BudgetCard from "components/budgets/BudgetCard";
import Notification from "components/Notification";

class BudgetsList extends React.Component {
  componentDidMount() {
    this.props.fetchBudgets();
  }

  componentDidUpdate(prevState, prevProps) {}

  renderBudgets() {
    const { budgetList } = this.props.budgets;

    return budgetList.map(budget => {
      return <BudgetCard budget={budget} key={budget._id} />;
    });
  }

  renderTitle() {
    const { budgetList } = this.props.budgets;
    return budgetList.length === 0 ? (
      <p className="subtitle is-4">Create a budget that works for you.</p>
    ) : (
      <p className="subtitle is-4">Your current budgets:</p>
    );
  }

  render() {
    const { loading } = this.props.budgets;
    const { success } = this.props.budgets.message;

    if (loading) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        {success ? <Notification /> : false}
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          {this.renderTitle()}
        </div>
        {this.renderBudgets()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ budgets }) => {
  return {
    budgets
  };
};

export default connect(
  mapStateToProps,
  { fetchBudgets, resetOnSuccessMessage }
)(BudgetsList);
