import accounting from "accounting-js";
import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const CheckItem = ({ check }) => {
  return (
    <tr>
      <td>{accounting.formatMoney(check.checkamount)}</td>
      <td>
        <Moment format="MM/DD/YYYY">{check.dateCreated}</Moment>
      </td>
      <td>
        <Link to="#" className="button is-danger is-small">
          Delete
        </Link>
        <Link to="#" className="button is-small" style={{ marginLeft: "10px" }}>
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default CheckItem;
