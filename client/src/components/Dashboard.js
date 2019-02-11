import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.fetchBudgets();
  }

  render() {
    return <div>Dashboard</div>;
  }
};

export default connect(null, actions)(Dashboard);
