import Joi from '@hapi/joi';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Redflag from '../models/redflag.model';
import User from '../models/user.model';

dotenv.config();
const { KEY } = process.env;

export const validateNewUser = async (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().regex(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/).min(5).required(),
    PhoneNumber: Joi.number().min(9).required(),
    username: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error.details[0].message);
  }

  const ExistingUser = await User.findUser(req.body.email);
  const ExistingUsername = await User.findUserWithUsername(req.body.username);
  if (ExistingUser.rowCount !== 0 || ExistingUsername.rowCount !== 0) {
    return res.status(409).json({
      status: 409,
      message: 'Email or Username already exists',
    });
  }

  return next();
};

export const validateExistingAccount = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(5).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error.details[0].message);
  }
  const user = await User.findUser(req.body.email);
  const existingUser = user.rows[0];

  const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);

  if (!((user.rowCount !== 0) && isPasswordCorrect)) {
    return res.status(404).json({
      status: 404,
      message: 'incorrect email or password',
    });
  }

  return next();
};
export const verifyToken = async (req, res, next) => {
  const token = req.header('token');

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Please sign in first.',
    });
  }


  const verified = jwt.verify(token, KEY);
  const user = await User.findUser(verified.email);
  const validUser = user.rows[0];
  if (!validUser) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid token!',
    });
  }
  return next();
};
export const validateRedflagRequest = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(4).required(),
    type: Joi.string().min(4).required(),
    comment: Joi.string().min(10).required(),
    location: Joi.string().min(10).required(),
    status: Joi.string().min(3).required(),
    images: Joi.array().required(),
    videos: Joi.array().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error.details[0].message);
  }
  return next();
};
export const findRedflag = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.number().required().min(1),
  });
  const result = schema.validate(req.params);
  if (result.error) {
    return res.status(400).json(result.error.details[0].message);
  }
  const redflagDb = await Redflag.findOneRedflag(req.params.id);
  const redflag = redflagDb.rows[0];
  if (redflag) {
    req.redflag = redflag;
    return next();
  }
  return res.status(404).json({
    status: 404,
    data: {
      message: 'red-flag not found',
    },
  });
};
export const findUserType = async (req, res, next) => {
  const userDb = await User.findUser(jwt.verify(req.header('token'), KEY).email);
  const user = userDb.rows[0];
  if (user.type === 'citizen') {
    req.user = user;
    return next();
  }
  return res.status(401).json({
    status: 401,
    data: {
      message: 'you must be a citizen',
    },
  });
};
export const ValidateRedflagChange = (req, res, next) => {
  if (req.body.status !== 'pending') {
    return res.status(401).json({
      status: 401,
      data: {
        message: 'you are not allowed to edit a red-flag which is under-investigation',
      },
    });
  }
  return next();
};
