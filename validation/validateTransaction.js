const Joi = require("joi");

function validateTransaction(transaction) {
  const schema = Joi.object()
    .keys({
      description: Joi.string().required(),
      amount: Joi.number().required()
    })
    .unknown();

  return Joi.validate(transaction, schema);
}

module.exports = validateTransaction;
