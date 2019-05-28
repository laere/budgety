const validate = validator => (req, res, next) => {
  const { error } = validator(req.body);

  if (err) return res.status(400).send(error.details[0].message);

  next();
};

module.exports = validate;
