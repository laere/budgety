import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      className="modal is-active text-white"
    >
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="modal-card">
          <div className="modal-card-head">{props.title}</div>
          <div className="modal-card-body">{props.content}</div>
          <div className="modal-card-foot">
            {props.actions}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
