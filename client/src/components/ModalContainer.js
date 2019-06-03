import React from "react";
import Modal from "components/Modal";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class ModalContainer extends React.Component {
  renderActions() {
    const { actionCreator, cancelpath } = this.props;
    return (
      <React.Fragment>
        <button onClick={actionCreator} className="button is-danger">
          Delete
        </button>
        <Link to={cancelpath} className="button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  render() {
    const { title, content } = this.props;
    return (
      <React.Fragment>
        <Modal title={title} content={content} actions={this.renderActions()} />
      </React.Fragment>
    );
  }
}

ModalContainer.propTypes = {
  actionCreator: PropTypes.func.isRequired,
  cancelpath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
};

export default ModalContainer;
