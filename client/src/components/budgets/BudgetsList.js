import React from "react";
import { connect } from "react-redux";
import { fetchBudgets } from "actions/budgets/budgetActions";
import Spinner from "components/Spinner";
import BudgetCard from "components/budgets/BudgetCard";
import Notification from "components/Notification";
import PropTypes from "prop-types";

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

  render() {
    const { loading } = this.props.budgets;

    if (loading) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        {this.renderNotifcations()}
        <div style={{ textAlign: "left", marginTop: "20px" }}>
          {this.renderTitle()}
        </div>
        {this.renderBudgets()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ budgets, errors }) => {
  return {
    budgets,
    errors
  };
};

BudgetsList.propTypes = {
  fetchBudgets: PropTypes.func.isRequired,
  budgets: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { fetchBudgets }
)(BudgetsList);
