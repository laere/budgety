import accounting from "accounting-js";
import React from "react";
import { connect } from "react-redux";
import { fetchBudgets, fetchUser } from "actions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Spinner from "components/Spinner";

class BudgetsList extends React.Component {
  componentDidMount() {
    this.props.fetchBudgets();
    this.props.fetchUser();
  }

  renderBudgets() {
    const { budgetList } = this.props.budgets;

    return budgetList.map(budget => {
      return (
        <div className="card" key={budget._id} style={{ marginTop: "30px" }}>
          <header className="card-header">
            <p className="card-header-title">{budget.title}</p>
            <p className="card-header-icon">
              Budget Amount: {accounting.formatMoney(budget.amount)}
            </p>
            <div className="card-header-icon">
              <span style={{ marginRight: "10px" }}>Created on:</span>{" "}
              <Moment format="MM/DD/YYYY">{budget.dateCreated}</Moment>
            </div>
          </header>
          <div className="card-content">
            <div className="content">{budget.description}</div>

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
    const { budgetList, loading } = this.props.budgets;

    if (loading) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          {budgetList.length === 0 ? (
            <p className="subtitle is-4">Create a budget that works for you.</p>
          ) : (
            <p className="subtitle is-4">Your current budgets:</p>
          )}
        </div>
        {this.renderBudgets()}
      </React.Fragment>
    );
  }
}

BudgetsList.propTypes = {
  budgets: PropTypes.object.isRequired,
  fetchBudgets: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired
};

const mapStateToProps = ({ budgets }) => {
  return {
    budgets
  };
};

export default connect(
  mapStateToProps,
  { fetchBudgets, fetchUser }
)(BudgetsList);
