import express from 'express';
import UsersController from '../controllers/users.controller';
import { validateExistingAccount } from '../middlewares/authentication.middleware';
import { validateNewUser } from '../middlewares/authentication.middleware';
const router = express.Router();

router.post('/api/v1/auth/signup',validateNewUser,UsersController.createUser);
router.post('/api/v1/auth/signin',validateExistingAccount,UsersController.loginUser);
  
export default router;