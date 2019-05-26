import accounting from "accounting-js";
import React from "react";
import { connect } from "react-redux";
import { fetchChecks } from "actions/checks/checkActions";
import Spinner from "components/Spinner";
import Moment from "react-moment";
import { Link } from "react-router-dom";

class CheckList extends React.Component {
  renderChecks() {
    console.log(this.props);

    const { budget } = this.props;

    if (!budget.paychecks || budget.paychecks.length === 0) {
      return <tr>You currently have no paychecks!</tr>;
    }

    return this.props.budget.paychecks.map(
      ({ checkamount, dateCreated, _id }) => {
        return (
          <tr key={_id}>
            <td>{accounting.formatMoney(checkamount)}</td>
            <td>
              <Moment format="MM/DD/YYYY">{dateCreated}</Moment>
            </td>
            <td>
              <Link to="#" className="button is-danger is-small">
                Delete
              </Link>
              <Link
                to="#"
                className="button is-small"
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
    // add loading flag with spinner

    if (!this.props.budget) {
      return <Spinner />;
    }

    return (
      <div style={{ marginTop: "40px" }}>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date Created</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>{this.renderChecks()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
};
export default connect(
  mapStateToProps,
  { fetchChecks }
)(CheckList);
