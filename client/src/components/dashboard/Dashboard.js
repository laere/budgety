import React from "react";
import Card from "components/Card";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1 className="title is-4">Dashboard</h1>
        <nav
          className="breadcrumb has-bullet-separator"
          aria-label="breadcrumbs"
        >
          <ul>
            <li>
              <Link to="/budgets">Budgets</Link>
            </li>
          </ul>
        </nav>
        <div className="dashboard-cards">
          <Card title="Add Budget" path="/budgets/new" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
