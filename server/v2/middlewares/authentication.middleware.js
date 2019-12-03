import { users } from '../models/data';
import { redflags } from '../models/data';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const KEY = process.env.KEY ;
export const validateNewUser = (req,res, next) =>{
  
  const schema =  Joi.object({
    id: Joi.number().min(16).required(),
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(3).required(),
    PhoneNumber: Joi.number().min(9).required(),
    username: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
      return res.status(400).json(result.error.details[0].message);
    }
    const ExistingUser = users.find((user) => user.email === req.body.email);
    if (ExistingUser) {
      return res.status(409).json({
        status: 409,
        message: 'Email already exists',
      }); 
    }
    
  return next();
}
export const validateExistingAccount = (req, res, next) => { 
  const schema =  Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required()
  });
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).json(result.error.details[0].message);
  }
  const existingUser = users.find((user) => user.email === req.body.email);
  const isPasswordCorrect=()=>{
    if(req.body.password === existingUser.password) return true;
  }
  if (!(existingUser && isPasswordCorrect())) {
    return res.status(404).json({
      status: 404,
      message: 'incorrect email or password',
    });
  }
  return next();
};
export const verifyToken = (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Please sign in first.',
    });
  }

  try {
    const verified = jwt.verify(token, KEY);
    const validUser = users.find((user) => user.email === verified.email);
    if (!validUser) {
      return res.status(400).json({
        status: 400,
        message: 'Invalid token!'
      });
    }
    return next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
};
export const validateRedflagRequest = (req, res, next) => {
  const schema =  Joi.object({
    title: Joi.string().min(4).required(),
    type: Joi.string().min(4).required(),
    comment: Joi.string().min(10).required(),
    location: Joi.string().min(10).required(),
    status: Joi.string().min(3).required(),
    images: Joi.array().required(),
    videos: Joi.array().required()
    });
    const result = schema.validate(req.body);
    if(result.error){
      return res.status(400).json(result.error.details[0].message);
    }
    return next();
}
export const findRedflag = (req, res, next) =>{
  try{
    const schema =  Joi.object({
      id: Joi.number().required().min(1)
    });
    const result = schema.validate(req.params);
    if(result.error){
      return res.status(400).json(result.error.details[0].message);
    }
    const redflag = redflags.find((item) => item.id.toString() === req.params.id);
    if (redflag) {
      req.redflag = redflag;
      return next();
    }
    return res.status(404).json({
      status: 404,
      data: {
        message: 'red-flag not found'
      },
    });
  }catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
  
}
export const findUserType = (req, res, next) =>{
  try{
    const  user = users.find((user) => user.email === jwt.verify(req.header('token'),KEY).email);
    if (user.type === 'citizen') {
       req.user = user
      return next();
    }
    return res.status(401).json({
      status: 401,
      data: {
        message: 'you must be a citizen'
      },
    });
  }catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
 
}
export const ValidateRedflagChange = (req, res, next) => {
  if (req.body.status != 'draft') {
    return res.status(401).json({
      status: 401,
      data: {
        message: 'you are not allowed to edit a red-flag which is under-investigation'
      },
    });
  }
  return next(); 
}
