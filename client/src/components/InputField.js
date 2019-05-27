import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type, style, id }) => {
  return (
    <div key={id}>
      <label className="label">{label}</label>
      <Field type={type} name={name} className={style} />
      <ErrorMessage
        className="help is-danger"
        name={name}
        component="div"
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};

InputField.defaultProps = {
  style: "input"
};

export default InputField;
