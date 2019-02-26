import React from "react";
import { connect } from "react-redux";
import accounting from "accounting-js";

class TransactionsList extends React.Component {
  renderTransactions() {
    const { transactions } = this.props.budget;

    if (!transactions) {
      return;
    }

    return transactions.map(({ amount, description, dateCreated }) => {
      const formatAmount = accounting.formatMoney(-amount);

      return (
        <tr key={amount} className="panel">
          <td>{dateCreated}</td>
          <td>{description}</td>
          <td>{formatAmount}</td>
          <td>
            <button className="button is-danger">Delete</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
            {this.renderTransactions()}
          </thead>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ budgets }, ownProps) => {
  console.log(ownProps);
  return { budget: budgets.budget };
};

export default connect(mapStateToProps)(TransactionsList);
