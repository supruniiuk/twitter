const ApiError = require('../errors/apiError');
const joi = require('joi').extend(require('@joi/date'));;

async function registrationValidation(req, res, next) {
  const schema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    birthDate: joi.date().format("DD/MM/YYYY").required(),
    isPrivate: joi.boolean().required()
  })

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return next(ApiError.badRequest(`Registration field validation failed`));
  }
}


async function loginValidation(req, res, next) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
  })

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    return next(ApiError.badRequest(`Registration field validation failed`));
  }
}

module.exports = {
  registrationValidation,
  loginValidation
}