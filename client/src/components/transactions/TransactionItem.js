import React from "react";
import accounting from "accounting-js";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TransactionItem = ({ transaction, budgetId }) => {
  return (
    <tr className="panel">
      <td>
        <Moment format="MM/DD/YYYY">{transaction.dateCreated}</Moment>
      </td>
      <td>{transaction.description}</td>
      <td>{accounting.formatMoney(-transaction.amount)}</td>
      <td>
        <Link
          to={`/budgets/${budgetId}/transactions/${transaction._id}/delete`}
          className="button is-danger"
        >
          Delete
        </Link>
        <Link
          to={`/budgets/${budgetId}/transactions/${transaction._id}/edit`}
          className="button"
          style={{ marginLeft: "10px" }}
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

TransactionItem.propTypes = {
  budgetId: PropTypes.string.isRequired,
  transaction: PropTypes.object.isRequired
};

export default TransactionItem;
