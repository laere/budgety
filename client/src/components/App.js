import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "actions";
import history from "../history";
import _ from "lodash";
import "./App.css";

import Header from "components/Header";
import LandingPage from "components/LandingPage";
import BudgetsList from "components/budgets/BudgetsList";
import BudgetCreate from "components/budgets/BudgetCreate";
import BudgetEdit from "components/budgets/BudgetEdit";
import BudgetShow from "components/budgets/BudgetShow";
import BudgetDelete from "components/budgets/BudgetDelete";
import TransactionNew from "components/transactions/TransactionNew";
import TransactionDelete from "components/transactions/TransactionDelete";
import TransactionEdit from "components/transactions/TransactionEdit";
import AddCheck from "components/checks/AddCheck";
import CheckList from "components/checks/CheckList";
import Dashboard from "components/dashboard/Dashboard";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router history={history}>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/budgets" component={BudgetsList} />
            <Route exact path="/budgets/new" component={BudgetCreate} />
            <Route exact path="/budgets/:budgetId" component={BudgetShow} />
            <Route
              exact
              path="/budgets/edit/:budgetId"
              component={BudgetEdit}
            />
            <Route
              exact
              path="/budgets/delete/:budgetId"
              component={BudgetDelete}
            />
            <Route
              exact
              path="/budgets/:budgetId/transactions/new"
              component={TransactionNew}
            />
            <Route
              exact
              path="/budgets/:budgetId/transactions/:transactionId/delete"
              component={TransactionDelete}
            />
            <Route
              exact
              path="/budgets/:budgetId/transactions/:transactionId/edit"
              component={TransactionEdit}
            />
            <Route
              exact
              path="/budgets/:budgetId/checks/new"
              component={AddCheck}
            />
            <Route
              exact
              path="/budgets/:budgetId/checks"
              component={CheckList}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(
  mapStateToProps,
  { fetchUser }
)(App);
