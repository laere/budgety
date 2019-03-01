import React from "react";
import accounting from "accounting-js";
import { connect } from "react-redux";
import { fetchBudgets, fetchUser } from "actions";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class BudgetsList extends React.Component {
  componentDidMount() {
    this.props.fetchBudgets();
    this.props.fetchUser();
  }

  renderBudgets() {
    return this.props.budgetList.map(budget => {
      return (
        <div className="card" key={budget._id} style={{ marginTop: "30px" }}>
          <header className="card-header">
            <p className="card-header-title">{budget.title}</p>
            <p className="card-header-icon">
              Budget Amount: {accounting.formatMoney(budget.amount)}
            </p>
            <div className="card-header-icon">
              Created on:{" "}
              <Moment format="MM/DD/YYYY">{budget.dateCreated}</Moment>
            </div>
          </header>
          <div className="card-content">
            <div className="content">{budget.description}</div>
            <div>
              Start Date:{" "}
              <Moment format="MM/DD/YYYY">{budget.startDate}</Moment>
            </div>
            <div>
              End Date: <Moment format="MM/DD/YYYY">{budget.endDate}</Moment>
            </div>
            <div style={{ marginTop: "20px" }}>
              You currently have <strong>{budget.transactions.length}</strong>{" "}
              {budget.transactions.length > 1 ||
              budget.transactions.length === 0
                ? "transactions"
                : "transaction"}{" "}
              for this budget!
            </div>
          </div>
          <footer className="card-footer">
            <Link to={`/budgets/${budget._id}`} className="card-footer-item">
              Configure Budget
            </Link>
          </footer>
        </div>
      );
    });
  }

  render() {
    return <React.Fragment>{this.renderBudgets()}</React.Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    budgetList: state.budgets.budgetList,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { fetchBudgets, fetchUser }
)(BudgetsList);
