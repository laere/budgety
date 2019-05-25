const budgetValidation = values => {
  let errors = {};

  const array = ["title", "description", "amount"];

  array.forEach(val => {
    if (!val) {
      errors.val = "This field is required.";
    }
  });

  return errors;
};

export default budgetValidation;
