function createError(msg, statusCode = 500) {
  let err = new Error(msg);
  err.statusCode = statusCode;
  return err;
}

const errors = {
  emailInUse: createError("We couldn’t process your request."),
  notFound: createError("Not found!", 404),
  passwordIncorrect: createError("Password is incorrect!")
};

module.exports = errors;
