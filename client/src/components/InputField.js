import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type, style }) => {
  console.log(label);
  return (
    <React.Fragment>
      <label className="label">{label}</label>
      <Field type={type} name={name} className={style} />
      <ErrorMessage
        className="help is-danger"
        name={name}
        component="div"
        style={{ fontSize: "16px" }}
      />
    </React.Fragment>
  );
};

InputField.defaultProps = {
  style: "input"
};

export default InputField;
