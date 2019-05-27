import React from "react";
import { connect } from "react-redux";
import { fetchBudgets } from "actions";
import Spinner from "components/Spinner";
import BudgetCard from "components/budgets/BudgetCard";

class BudgetsList extends React.Component {
  componentDidMount() {
    this.props.fetchBudgets();
  }

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

    if (loading) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
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
  { fetchBudgets }
)(BudgetsList);
