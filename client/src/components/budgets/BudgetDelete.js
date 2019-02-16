import React from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import { deleteBudget } from 'actions';
import { Link } from 'react-router-dom';


class BudgetDelete extends React.Component {

  renderActions() {
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteBudget(this.props.match.params.id)}
          className="button is-danger">
            Delete
        </button>
        <Link to="/budgets" className="button">Cancel</Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div>
        <Modal
          title="Delete Budget"
          content="Are you sure you want to delete this budget?"
          actions={this.renderActions()}
        />
      </div>
    );
  }
}

export default connect(null, { deleteBudget })(BudgetDelete);
