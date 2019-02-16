import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class BudgetShow extends React.Component {
  componentDidMount() {
    console.log(this.props.match.params.id);
    this.props.fetchBudget(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        Budget Show
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { budget: state.budgets[ownProps.match.params.id] };
}

export default connect(mapStateToProps, actions)(BudgetShow);
