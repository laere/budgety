import React from "react";
import accounting from "accounting-js";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class TransactionsList extends React.Component {
  renderTransactions() {
    const { budget } = this.props;

    if (!budget.transactions || budget.transactions.length === 0) {
      return <tr>You currently have no transactions!</tr>;
    }

    return budget.transactions.map(
      ({ amount, description, dateCreated, _id }) => {
        const formatAmount = accounting.formatMoney(-amount);

        return (
          <tr key={_id} className="panel">
            <td>
              <Moment format="MM/DD/YYYY">{dateCreated}</Moment>
            </td>
            <td>{description}</td>
            <td>{formatAmount}</td>
            <td>
              <Link
                to={`/budgets/${budget._id}/transactions/${_id}/delete`}
                className="button is-danger"
              >
                Delete
              </Link>
              <Link
                to={`/budgets/${budget._id}/transactions/${_id}/edit`}
                className="button"
                style={{ marginLeft: "10px" }}
              >
                Edit
              </Link>
            </td>
          </tr>
        );
      }
    );
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
          </thead>
          <tbody>{this.renderTransactions()}</tbody>
        </table>
      </div>
    );
  }
}

TransactionsList.propTypes = {
  budget: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
};

export default connect(mapStateToProps)(TransactionsList);
