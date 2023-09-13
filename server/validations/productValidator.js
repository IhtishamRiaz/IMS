import Joi from "joi";

const validateNewProduct = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    price: Joi.number().required().label('Price'),
    min: Joi.number().required().label('Min'),
    max: Joi.number().required().label('Max'),
    category: Joi.string().required().label('Category')
  })
  return JoiSchema.validate(data);
}
const validateUpdateProduct = (data) => {
  const JoiSchema = Joi.object({
    id: Joi.string().required().label('ID'),
    name: Joi.string().required().label('Name'),
    price: Joi.number().required().label('Price'),
    min: Joi.number().required().label('Min'),
    max: Joi.number().required().label('Max'),
    category: Joi.string().required().label('Category')
  })
  return JoiSchema.validate(data);
}

const validateProductCategory = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Name'),
  })
  return JoiSchema.validate(data);
}

export { validateNewProduct, validateUpdateProduct, validateProductCategory }