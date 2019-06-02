import React from "react";
import { Field, ErrorMessage } from "formik";
import PropTypes from "prop-types";

const InputField = ({ label, name, type, classStyleName }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <Field
        type={type}
        name={name}
        className={classStyleName}
        component={classStyleName}
      />
      <ErrorMessage
        className="help is-danger"
        name={name}
        component="div"
        style={{ fontSize: "20px" }}
      />
    </div>
  );
};

InputField.defaultProps = {
  classStyleName: "input",
  type: "text"
};

InputField.propTypes = {
  classStyleName: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default InputField;
