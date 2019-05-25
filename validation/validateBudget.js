const Joi = require("joi");

function validateBudget(budget) {
  const schema = Joi.object()
    .keys({
      title: Joi.string()
        .min(2)
        .max(50)
        .required(),
      description: Joi.string()
        .min(2)
        .max(50)
        .required(),
      amount: Joi.number().required()
    })
    .unknown();

  return Joi.validate(budget, schema);
}

module.exports = validateBudget;
