const transactionValidation = values => {
  let errors = {};

  for (let val in values) {
    if (!values[val]) {
      errors[val] = "This field is required.";
    } else if (values[val] && values[val].length < 2) {
      errors[val] = `${val} must be more than 2 characters long.`;
    }
  }

  return errors;
};

export default transactionValidation;
