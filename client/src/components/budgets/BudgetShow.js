import React from "react";
import accounting from "accounting-js";
import { connect } from "react-redux";
import { fetchBudget, fetchUser } from "actions";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TransactionsList from "components/transactions/TransactionsList";

class BudgetShow extends React.Component {
  componentDidMount() {
    const { budgetId } = this.props.match.params;

    this.props.fetchBudget(budgetId);
    this.props.fetchUser();
  }

  render() {
    const { budget } = this.props;
    return (
      <div>
        <Link
          to="/budgets"
          className="button is-primary is-large"
          style={{ marginTop: "20px" }}
        >
          Go Back
        </Link>
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
          </div>
          <footer className="card-footer">
            <Link
              to={`/budgets/edit/${budget._id}`}
              className="card-footer-item"
            >
              Edit
            </Link>
            <Link
              to={`/budgets/delete/${budget._id}`}
              className="card-footer-item"
            >
              Delete
            </Link>
            <Link
              to={`/budgets/${budget._id}/transactions/new`}
              className="card-footer-item"
            >
              Add Transaction
            </Link>
          </footer>
        </div>
        <TransactionsList transactions={budget.transactions} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
};

export default connect(
  mapStateToProps,
  { fetchBudget, fetchUser }
)(BudgetShow);
