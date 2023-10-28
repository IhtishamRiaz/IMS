import Joi from "joi";

const validateNewProduct = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Name'),
    PPrice: Joi.number().required().label('Purchase Price'),
    SPrice: Joi.number().required().label('Sale Price'),
    packingType: Joi.string().required().label('Packing Type'),
    packingSize: Joi.number().required().label('Packing Size'),
    min: Joi.number().required().label('Min'),
    max: Joi.number().required().label('Max'),
    category: Joi.string().required().label('Category'),
    supplier: Joi.string().required().label('Supplier')
  })
  return JoiSchema.validate(data);
}
const validateUpdateProduct = (data) => {
  const JoiSchema = Joi.object({
    id: Joi.string().required().label('ID'),
    name: Joi.string().required().label('Name'),
    PPrice: Joi.number().required().label('Purchase Price'),
    SPrice: Joi.number().required().label('Sale Price'),
    packingType: Joi.string().required().label('Packing Type'),
    packingSize: Joi.number().required().label('Packing Size'),
    min: Joi.number().required().label('Min'),
    max: Joi.number().required().label('Max'),
    category: Joi.string().required().label('Category'),
    supplier: Joi.string().required().label('Supplier')
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