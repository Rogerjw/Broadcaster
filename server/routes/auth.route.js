import express from 'express';
import UsersController from '../controllers/users.controller';
import { loginValidate } from '../middlewares/auth.middleware';
import { signupValidate } from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/api/v1/auth/signup',signupValidate,UsersController.createUser);
router.post('/api/v1/auth/signin',loginValidate,UsersController.loginUser);
  
export default router;