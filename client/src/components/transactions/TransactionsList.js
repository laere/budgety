import React from "react";
import accounting from "accounting-js";
import Moment from "react-moment";

class TransactionsList extends React.Component {
  renderTransactions() {
    const { transactions } = this.props;

    if (!transactions || transactions.length === 0) {
      return <tr>You currently have no transactions!</tr>;
    }

    return transactions.sort().map(({ amount, description, dateCreated }) => {
      const formatAmount = accounting.formatMoney(-amount);

      return (
        <tr key={amount} className="panel">
          <td>
            <Moment format="MM/DD/YYYY">{dateCreated}</Moment>
          </td>
          <td>{description}</td>
          <td>{formatAmount}</td>
          <td>
            <button className="button is-danger">Delete</button>
            <button className="button" style={{ marginLeft: "10px" }}>
              Edit
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: "40px" }}>
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Options</th>
            </tr>
            {this.renderTransactions()}
          </thead>
        </table>
      </div>
    );
  }
}

export default TransactionsList;
