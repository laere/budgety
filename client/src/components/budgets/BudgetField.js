import React from "react";
import Moment from "react-moment";

const BudgetField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" type={type} {...input} />
      <div style={{ color: "red", fontWeight: "bold" }}>{touched && error}</div>
    </div>
  );
};

export default BudgetField;
