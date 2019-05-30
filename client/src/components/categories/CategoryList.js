import React from "react";
import { connect } from "react-redux";

class CategoryList extends React.Component {
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
          <tbody />
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { budget: state.budgets.budget };
};

export default connect(mapStateToProps)(CategoryList);
