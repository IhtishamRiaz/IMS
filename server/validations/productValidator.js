import Joi from "joi";

const validateNewProduct = (data) => {
  const JoiSchema = Joi.object({
    name: Joi.string().required().label('Name'),
  })
  return JoiSchema.validate(data);
}

export { validateNewProduct }