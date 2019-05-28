import React from "react";
import { Field, ErrorMessage } from "formik";

const InputField = ({ label, name, type, classStyleName, id }) => {
  return (
    <div key={id}>
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

export default InputField;
