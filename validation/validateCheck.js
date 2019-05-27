const Joi = require("joi");

function validateCheck(check) {
  const schema = Joi.object()
    .keys({
      checkamount: Joi.string()
    })
    .unknown();

  return Joi.validate(check, schema);
}

module.exports = validateCheck;
