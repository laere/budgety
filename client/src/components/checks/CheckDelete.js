import React from "react";
import Modal from "components/Modal";
import { connect } from "react-redux";
import { deleteCheck } from "actions/checks/checkActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class CheckDelete extends React.Component {
  renderActions() {
    const { budgetId, checkId } = this.props.match.params;
    return (
      <React.Fragment>
        <button
          onClick={() => this.props.deleteCheck(budgetId, checkId)}
          className="button is-danger"
        >
          Delete
        </button>
        <Link to={`/budgets/${budgetId}`} className="button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          title="Delete Check"
          content="Are you sure you want to delete this check?"
          actions={this.renderActions()}
        />
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  { deleteCheck }
)(CheckDelete);
