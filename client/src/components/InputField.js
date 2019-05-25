import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type }) => {
  return (
    <React.Fragment>
      <label className="label">{label}</label>
      <Field type={type} name={name} className="input" />
      <ErrorMessage
        className="help is-danger"
        name={name}
        component="div"
        style={{ fontSize: "16px" }}
      />
    </React.Fragment>
  );
};

export default InputField;
