import React from "react";
import accounting from "accounting-js";
import { connect } from "react-redux";
import { fetchBudget } from "actions/budgets/budgetActions";
import { addCategory } from "actions/categories/categoryActions";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import Spinner from "components/Spinner";
import CheckList from "components/checks/CheckList";
import Notification from "components/Notification";
import PropTypes from "prop-types";
import Category from "components/categories/Category";

class BudgetShow extends React.Component {
  componentDidMount() {
    const { budgetId } = this.props.match.params;

    this.props.fetchBudget(budgetId);
  }

  renderNotifcations() {
    const { success, failure } = this.props.errors;
    // if errors isnt empty there must be a message
    if (success || failure) {
      // if message is sucess return the success message
      if (success) {
        return <Notification notificationColor="is-primary" />;
      } else if (failure) {
        // return the failure message
        return <Notification notificationColor="is-danger" />;
      }
    }
  }

  renderCategories() {
    const { budget } = this.props.budgets;

    if (!budget.categories) {
      return <Spinner />;
    }

    return budget.categories.map(category => {
      // console.log(category);
      return (
        <Category
          key={category._id}
          category={category}
          budgetId={budget._id}
        />
      );
    });
  }

  render() {
    const { budget, loading } = this.props.budgets;

    console.log("ID", this.props.match.params.budgetId);

    if (budget === null || loading) {
      return <Spinner />;
    }

    return (
      <div>
        <Link
          to="/budgets"
          className="button is-primary is-large"
          style={{ marginTop: "20px" }}
        >
          Go Back
        </Link>
        {this.renderNotifcations()}
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
          </div>
          <footer className="card-footer">
            <Link
              to={`/budgets/${budget._id}/checks/new`}
              className="card-footer-item"
            >
              Add Paycheck
            </Link>
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
          </footer>
        </div>
        <CheckList />
        <div style={{ marginTop: "50px" }}>
          <h1 className="title">Categories</h1>
          <button
            className="button is-outline is-primary"
            onClick={() => this.props.addCategory(budget._id)}
          >
            Add Category
          </button>
          {this.renderCategories()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ budgets, errors }) => {
  return { budgets, errors };
};

BudgetShow.propTypes = {
  fetchBudget: PropTypes.func.isRequired,
  budgets: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { fetchBudget, addCategory }
)(BudgetShow);
