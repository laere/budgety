import React from "react";
import { connect } from "react-redux";
import { fetchChecks } from "actions/checks/checkActions";
import Spinner from "components/Spinner";

class CheckList extends React.Component {
  componentDidMount() {
    this.props.fetchChecks();
  }

  renderChecks() {
    this.props.checks.map(check => {
      return (
        <div>
          <div>{check.checkamount}</div>
          <div>{check.dateCreated}</div>
        </div>
      );
    });
  }

  render() {
    // add loading flag with spinner

    return <div>{this.renderChecks()}</div>;
  }
}

const mapStateToProps = ({ checks }) => {
  return { checks };
};

export default connect(
  mapStateToProps,
  { fetchChecks }
)(CheckList);
