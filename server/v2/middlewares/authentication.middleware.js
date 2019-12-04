import Redflag from '../models/redflag.model';
import { redflags } from '../models/data';
import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model';
dotenv.config();
const KEY = process.env.KEY ;
export const validateNewUser = async (req,res, next) =>{
  try{
    const schema =  Joi.object({
      id: Joi.number().min(1).required(),
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
      
      const ExistingUser = await User.findUser(req.body.email);
      if (ExistingUser.rowCount === 1) {
        return res.status(409).json({
          status: 409,
          message: 'Email already exists',
        }); 
      }
      
    return next();
  }catch(error){
    next(error);
  }
  
}
export const validateExistingAccount = async(req, res, next) => { 
  try{
    const schema =  Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(5).required()
    });
    const result = schema.validate(req.body);
    if(result.error){
      return res.status(400).json(result.error.details[0].message);
    }
    const user = await User.findUser(req.body.email);
    const existingUser = user.rows[0];
    const isPasswordCorrect = () =>{
      if(req.body.password === existingUser.password) return true;
    }
    if (!((user.rowCount === 1) && isPasswordCorrect())) {
      return res.status(404).json({
        status: 404,
        message: 'incorrect email or password',
      });
    }
    
      return next();
    
    
  }catch(error){
    next(error);
  }
  
};
export const verifyToken = async(req, res, next) => {
  try{
    const token = req.header('token');

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Please sign in first.',
    });
  }

  try {
    const verified = jwt.verify(token, KEY);
    const user = await User.findUser(verified.email);
    const validUser = user.rows[0];
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
  }catch(error){
    next(error);
  }
  
};
export const validateRedflagRequest = (req, res, next) => {
  try{
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
  }catch(error){
    next(error);
  }
 
}
export const findRedflag = async  (req, res, next) =>{
  try{
    const schema =  Joi.object({
      id: Joi.number().required().min(1)
    });
    const result = schema.validate(req.params);
    if(result.error){
      return res.status(400).json(result.error.details[0].message);
    }
    const redflagDb = await Redflag.findRedflag(req.params.id);
    const redflag = redflagDb.rows[0];
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
export const findUserType = async(req, res, next) =>{
  try{
    const userDb = await User.findUser(jwt.verify(req.header('token'),KEY).email);
    const user = userDb.rows[0];
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
