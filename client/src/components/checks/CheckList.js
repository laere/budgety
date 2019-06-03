import React from "react";
import { connect } from "react-redux";
import CheckItem from "components/checks/CheckItem";
import PropTypes from "prop-types";

class CheckList extends React.Component {
  renderChecks() {
    const { paychecks, _id } = this.props.budget;

    if (!paychecks || paychecks.length === 0) {
      return <tr>You currently have no paychecks!</tr>;
    }

    return paychecks.map(check => {
      return <CheckItem check={check} key={check._id} budgetId={_id} />;
    });
  }

  render() {
    return (
      <div style={{ marginTop: "40px" }}>
        <h2 className="title is-5">Paychecks</h2>
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

CheckList.propTypes = {
  budget: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(CheckList);
