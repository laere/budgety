import React from 'react';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import * as actions from 'actions';
import history from '../../history';
import { Link } from 'react-router-dom';


class BudgetDelete extends React.Component {
  componentDidMount() {
    // console.log(this.props.match.params.id);
    // this.props.fetchBudget(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <button
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

const mapStateToProps = (state, ownProps)=> {
  return { budget: state.budgets[ownProps.match.params.id] };
}

export default connect(mapStateToProps, actions)(BudgetDelete);
