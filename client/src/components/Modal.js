import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Modal = ({ title, content, actions }) => {
  return ReactDOM.createPortal(
    <div className="modal is-active text-white">
      <div className="modal-background" />
      <div className="modal-content">
        <div className="modal-card">
          <div className="modal-card-head">{title}</div>
          <div className="modal-card-body">{content}</div>
          <div className="modal-card-foot">{actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

export default Modal;
