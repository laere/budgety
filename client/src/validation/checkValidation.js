const checkValidation = values => {
  let errors = {};

  if (!values.checkamount) {
    errors.checkamount = "This field is required.";
  }

  return errors;
};

export default checkValidation;
