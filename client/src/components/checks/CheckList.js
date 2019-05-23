import accounting from "accounting-js";
import React from "react";
import { connect } from "react-redux";
import { fetchChecks } from "actions/checks/checkActions";
import Spinner from "components/Spinner";
import Moment from "react-moment";

class CheckList extends React.Component {
  componentDidMount() {
    this.props.fetchChecks();
  }

  renderChecks() {
    return this.props.checks.map(({ checkamount, dateCreated, _id }) => {
      return (
        <tr key={_id}>
          <td>{accounting.formatMoney(checkamount)}</td>
          <td>
            <Moment format="MM/DD/YYYY">{dateCreated}</Moment>
          </td>
        </tr>
      );
    });
  }

  render() {
    // add loading flag with spinner

    return (
      <div style={{ marginTop: "40px" }}>
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>{this.renderChecks()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ checks }) => {
  return { checks };
};

export default connect(
  mapStateToProps,
  { fetchChecks }
)(CheckList);
