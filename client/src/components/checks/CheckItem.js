import accounting from "accounting-js";
import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CheckItem = ({ check, budgetId }) => {
  return (
    <tr>
      <td>{accounting.formatMoney(check.checkamount)}</td>
      <td>
        <Moment format="MM/DD/YYYY">{check.dateCreated}</Moment>
      </td>
      <td>
        <Link
          to={`/budgets/${budgetId}/checks/${check._id}/delete`}
          className="button is-danger is-small is-outlined"
        >
          Delete
        </Link>
        <Link
          to={`/budgets/${budgetId}/checks/${check._id}/edit`}
          className="button is-small"
          style={{ marginLeft: "10px" }}
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

CheckItem.propTypes = {
  check: PropTypes.object.isRequired,
  budgetId: PropTypes.string.isRequired
};

export default CheckItem;
