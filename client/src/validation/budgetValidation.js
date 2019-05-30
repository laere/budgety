const budgetValidation = values => {
  let errors = {};

  for (let val in values) {
    if (!values[val]) {
      errors[val] = "This field is required.";
    } else if (values[val] && values[val].length < 2) {
      errors[val] = "This field must be more than 2 characters long.";
    }
  }

  return errors;
};

export default budgetValidation;
