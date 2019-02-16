import React from 'react';
import accounting from 'accounting-js';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { Link } from 'react-router-dom';

class BudgetsList extends React.Component {
  componentDidMount() {
    this.props.fetchBudgets();
  }

  renderBudgets() {
    return this.props.budgets.map(budget => {
      return (
        <div className="card" key={budget._id} style={{marginTop: '30px'}}>
          <header className="card-header">
            <p className="card-header-title">
              {budget.title}
            </p>
            <p className="card-header-icon">
              Budget Amount: {accounting.formatMoney(budget.amount)}
            </p>
            <div className="card-header-icon">Created on: {new Date(budget.dateCreated).toLocaleDateString()}</div>
          </header>
          <div className="card-content">
            <div className="content">
              {budget.description}
            </div>
            <div>Start Date: {new Date(budget.startDate).toLocaleDateString()}</div>
            <div>End Date: {new Date(budget.endDate).toLocaleDateString()}</div>
          </div>
          <footer className="card-footer">
            <Link to={`/budgets/${budget._id}`} className="card-footer-item">Configure Budget</Link>
          </footer>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderBudgets()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { budgets: state.budgets.budgetList };
}

export default connect(mapStateToProps, actions)(BudgetsList);
