import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions';

import Header from 'components/Header';
import LandingPage from 'components/LandingPage';
import Budgets from 'components/Budgets';
import BudgetNew from 'components/BudgetNew';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/budgets" component={Budgets} />
            <Route path="/budgets/new" component={BudgetNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
