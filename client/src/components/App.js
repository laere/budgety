import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';
import history from '../history';

import Header from 'components/Header';
import LandingPage from 'components/LandingPage';
import Dashboard from 'components/Dashboard';
import BudgetForm from 'components/budgets/BudgetForm';
import BudgetEdit from 'components/budgets/BudgetEdit';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Header />
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/budgets" component={Dashboard} />
          <Route path="/budgets/new" component={BudgetForm} />
          <Route path="/budgets/edit/:id" component={BudgetEdit} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, actions)(App);
