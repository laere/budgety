const Joi = require("joi");

function validateBudget(budget) {
  const schema = Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      amount: Joi.number().required(),
      startDate: Joi.string().required(),
      endDate: Joi.string().required()
    })
    .unknown();

  return Joi.validate(budget, schema);
}

module.exports = validateBudget;
