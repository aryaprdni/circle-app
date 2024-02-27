import * as Joi from "joi";

const registerValidation = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const updateValidation = Joi.object({
  username: Joi.string().max(100).required(),
  full_name: Joi.string().max(100).required(),
  bio: Joi.string().max(100).required(),
  email: Joi.string().max(100).required(),
  password: Joi.string().min(4).max(100).required(),
  profile_description: Joi.string().allow(null),
  profile_picture: Joi.string().allow(null),
});

const loginValidation = Joi.object({
  username: Joi.string().max(100).allow(null),
  password: Joi.string().max(100).required(),
});

export { updateValidation, loginValidation, registerValidation };
