import React from 'react';
import accounting from 'accounting-js';
import { connect } from 'react-redux';
import { fetchBudget } from 'actions';
import { Link } from 'react-router-dom';

class BudgetShow extends React.Component {
  componentDidMount() {
    const { budgetId } = this.props.match.params;

    this.props.fetchBudget(budgetId);
  }

  renderBudget() {
    const { budget } = this.props;
    return (
      <div>
        <Link to="/budgets" className="button is-primary is-large" style={{marginTop: '20px'}}>Go Back</Link>
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
            <Link to={`/budgets/edit/${budget._id}`} className="card-footer-item">Edit</Link>
            <Link to={`/budgets/delete/${budget._id}`} className="card-footer-item">Delete</Link>
          </footer>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBudget()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
}

export default connect(mapStateToProps, { fetchBudget })(BudgetShow);
