import Joi from "joi";

const validateRegister = (data) => {
    const JoiSchema = Joi.object({
        name: Joi.string().required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string().min(8).required().label('Password')
    })
    return JoiSchema.validate(data);
}

export default validateRegister;