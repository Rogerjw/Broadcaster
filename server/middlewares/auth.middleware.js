import { users } from '../models/data';
import Joi from '@hapi/joi';
export const signupValidate = (req,res, next) =>{
  const ExistingUser = users.find((user) => user.email === req.body.email);
  if (ExistingUser) {
    return res.status(409).send({
      status: 409,
      message: 'Email already exists',
    });
    
  }
  const schema =  Joi.object({
    id: Joi.number().min(16).required(),
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required(),
    PhoneNumber: Joi.number().min(10).required(),
    username: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
      res.status(400).send(result.error.details[0].message);
      return;
    }
  next();
}
export const loginValidate = (req, res, next) => {
  
  const schema =  Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
  });
  const result = schema.validate(req.body);
  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const existingUser = users.find((user) => user.email === req.body.email);
  const isPasswordCorrect=()=>{
    if(req.body.password === existingUser.password) return true;
  }
  if (!(existingUser && isPasswordCorrect())) {
    return res.status(404).send({
      status: 404,
      message: 'incorrect email or password',
    });
  }
  next();
};
