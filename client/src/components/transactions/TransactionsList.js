import React from "react";
import { connect } from "react-redux";
import TransactionItem from "components/transactions/TransactionItem";
import PropTypes from "prop-types";

class TransactionsList extends React.Component {
  renderTransactions() {
    const { budget } = this.props;

    if (!budget.transactions || budget.transactions.length === 0) {
      return <tr>You currently have no transactions!</tr>;
    }

    return budget.transactions.map(transaction => {
      return (
        <TransactionItem
          transaction={transaction}
          key={transaction._id}
          budgetId={budget._id}
        />
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "40px" }}>
        <h2 className="title is-5">Transactions</h2>
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{this.renderTransactions()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
};

export default connect(mapStateToProps)(TransactionsList);
