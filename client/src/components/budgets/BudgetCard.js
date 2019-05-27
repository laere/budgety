import React from "react";
import accounting from "accounting-js";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const BudgetCard = ({ budget }) => {
  return (
    <div className="card" style={{ marginTop: "30px" }}>
      <header className="card-header">
        <p className="card-header-title">{budget.title}</p>
        <p className="card-header-icon">
          Budget Amount: {accounting.formatMoney(budget.amount)}
        </p>
        <div className="card-header-icon">
          <span style={{ marginRight: "10px" }}>Created on:</span>{" "}
          <Moment format="MM/DD/YYYY">{budget.dateCreated}</Moment>
        </div>
      </header>
      <div className="card-content">
        <div className="content">{budget.description}</div>

        <div style={{ marginTop: "20px" }}>
          You currently have <strong>{budget.transactions.length}</strong>{" "}
          {budget.transactions.length > 1 || budget.transactions.length === 0
            ? "transactions"
            : "transaction"}{" "}
          for this budget!
        </div>
      </div>
      <footer className="card-footer">
        <Link to={`/budgets/${budget._id}`} className="card-footer-item">
          Configure Budget
        </Link>
      </footer>
    </div>
  );
};

export default BudgetCard;
