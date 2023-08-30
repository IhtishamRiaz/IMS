import Joi from "joi";

const validateNewAccount = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    mobile: Joi.string().required().label('Mobile'),
    accountType: Joi.string().required().label('Account Type'),
    city: Joi.string().required().label('City'),
    isSalesman: Joi.boolean().label('Is Salesman'),
    salesRep: Joi.string().label('Sales Rep')
  })
  return JoiSchema.validate(data);
}

const validateUpdateAccount = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().label('Name'),
    mobile: Joi.string().label('Mobile'),
    accountType: Joi.string().label('Account Type'),
    city: Joi.string().label('City'),
    isSalesman: Joi.boolean().label('Is Salesman'),
    salesRep: Joi.string().label('Sales Rep')
  })
  return JoiSchema.validate(data);
}

const validateAccountType = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Account Type Name')
  })
  return JoiSchema.validate(data);
}

const validateCity = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('City Name'),
    area: Joi.string().label('Area Name')
  })
  return JoiSchema.validate(data);
}
const validateArea = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Area Name'),
  })
  return JoiSchema.validate(data);
}


export { validateNewAccount, validateUpdateAccount, validateAccountType, validateCity, validateArea };