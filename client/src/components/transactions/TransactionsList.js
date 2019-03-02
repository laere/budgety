import React from "react";
import accounting from "accounting-js";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTransaction, fetchUser } from "actions";

class TransactionsList extends React.Component {
  renderTransactions() {
    const { budget } = this.props.budgets;

    if (!budget.transactions || budget.transactions.length === 0) {
      return <p>You currently have no transactions!</p>;
    }

    return budget.transactions
      .sort()
      .map(({ amount, description, dateCreated, _id }) => {
        const formatAmount = accounting.formatMoney(-amount);

        return (
          <tr key={_id} className="panel">
            <td>
              <Moment format="MM/DD/YYYY">{dateCreated}</Moment>
            </td>
            <td>{description}</td>
            <td>{formatAmount}</td>
            <td>
              <button
                onClick={() => this.props.deleteTransaction(budget._id, _id)}
                className="button is-danger"
              >
                Delete
              </button>
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

TransactionsList.propTypes = {
  deleteTransaction: PropTypes.func.isRequired,
  budgets: PropTypes.object.isRequired
};

// TODO: Instead of grabbing entire budgets budgetList
// grab the single budget you're currently showing
const mapStateToProps = ({ budgets, auth }) => {
  return { budgets, auth };
};

export default connect(
  mapStateToProps,
  { deleteTransaction, fetchUser }
)(TransactionsList);
