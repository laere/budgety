import React from 'react';

const BudgetField = ({ input, label, type, meta: { touched, error} }) => {
  // console.log(props);
  return (
    <div>
      <label className="label">{label}</label>
      <input className="input" type={type} {...input} />
      <div style={{ color: 'red', fontWeight: 'bold' }}>
        {touched && error}
      </div>
    </div>
  );
}

export default BudgetField;
