import express from 'express';
import UsersController from '../controllers/users.controller';
import { ifEmailExist } from '../middlewares/auth.middleware';
const router = express.Router();

router.post('/api/v1/auth/signup',ifEmailExist,UsersController.createUser);
router.post('/api/v1/auth/signin',UsersController.loginUser);
  
export default router;