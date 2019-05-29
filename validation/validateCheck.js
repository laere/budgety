const Joi = require("joi");

function validateCheck(check) {
  const schema = Joi.object()
    .keys({
      checkamount: Joi.number()
    })
    .unknown();

  return Joi.validate(check, schema);
}

module.exports = validateCheck;
